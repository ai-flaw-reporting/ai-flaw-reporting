# Adding a New Integration to the n8n Workflow

This guide walks you through adding a new third-party integration (e.g. a vulnerability database, an alerting service, an archive) to the AI Flaw Reporting workflow **using the n8n web editor**.

The two reference integrations already on the canvas — **HuggingFace** and **CERT VINCE** — illustrate the two flavours of this pattern. Open the workflow side-by-side with this guide and you can copy whichever shape matches your partner.

---

## Before you start

- Open the workflow in the n8n editor and locate the existing branches.
- Toggle the workflow **Inactive** (top-right of the editor) before you make changes — an active workflow keeps firing on incoming Strapi webhooks while you edit.
- Have ready: the partner's API endpoint URL, auth token / credentials, and a copy of their request schema (which fields are required, JSON or multipart, etc.).
- Know whether the partner accepts file attachments. This decides whether you need a file-handling sub-branch.

---

## Where new branches plug in

Every integration branch starts after the **`Combine Report with Files`** node. That node is the fan-out point: it carries the parsed Strapi report on `$json` and any uploaded files on `$binary`, ready to be dispatched to as many downstream services as you want.

```
Webhook ──► Extract Report Data ─┐
        └─► Extract Upload Metadata ──► Check if Files Exist ──► Download Files ──┐
                                                                                  ▼
                                                          Combine Report with Files
                                                                ├──► HuggingFace branch    (existing)
                                                                ├──► CERT VINCE branch     (existing)
                                                                └──► YOUR NEW BRANCH       (you add this)
```

**Tip:** the fastest way to start is to **right-click an existing branch** (HuggingFace or CERT) → **Duplicate**, then rename and rewire. Most of the boilerplate is already there.

---

## Step 1 — Decide if the integration is opt-in

There are two patterns. Pick one before you start dragging nodes.

**Always-on** (HuggingFace model)
The integration runs on every report. No gating node — the Prepare-Data node connects directly to `Combine Report with Files`.

**Stakeholder-gated** (CERT VINCE model)
The integration runs only when the reporter selected your partner in the form. Add an **If** node first.

How to add the gate:

1. Search **If** in the side panel and drop it onto the canvas.
2. Rename it `Check X Selected` (replace `X` with your partner's short name).
3. In the _Conditions_ drawer, add one condition:
   - Type → **Boolean**
   - Operation → **is true**
   - Value 1 → expression mode, paste:
     ```
     {{ $json.reviewReport?.selectedStakeholders?.includes('YOUR_KEY') ?? false }}
     ```
   - Replace `YOUR_KEY` with the value the form uses for your partner (check the existing CERT example for the exact spelling convention).
4. Wire the input from `Combine Report with Files`. The **true** output goes to your Prepare-Data node (Step 2). The **false** output stays disconnected.

---

## Step 2 — Add a "Prepare Data" Code node

This node is where you adapt the generic report payload to your partner's expected shape. **Always do payload assembly here, not in HTTP-node expressions** — expressions silently drop values when `JSON.stringify` fails on something unexpected, and you will lose data without an error.

1. Search **Code** in the side panel, drag onto the canvas.
2. Double-click the title and rename it `Prepare X Data`.
3. Open the editor (JavaScript). The minimum useful skeleton:

   ```js
   const data = $input.first().json;
   const entryData = data.fullFormData || data;

   // Map entryData fields into whatever shape the partner expects.
   const payload = {
     // ...your mapping here
   };

   const output = {
     json: {
       apiUrl: "https://partner.example.com/api/submit",
       payload,
       hasFiles: data.hasFiles || false,
       binaryKeys: data.binaryKeys || "",
     },
   };

   // If the partner accepts file attachments, carry binaries through:
   try {
     const upstream = $("Combine Report with Files").first();
     if (upstream?.binary && Object.keys(upstream.binary).length > 0) {
       output.binary = { ...upstream.binary };
     }
   } catch (e) {
     /* no files */
   }

   return [output];
   ```

4. **Important — files vanish silently**. If you forget the `output.binary = { ... }` block, any uploaded files dropped before reaching your HTTP node and the multipart upload will be empty. Look at `Prepare CERT Data` for a working example.

---

## Step 3 — (Only if your partner accepts files) add a file branch

Skip this whole step if your partner only takes JSON.

You will end up with two HTTP nodes — one with files, one without — gated by an If node and (usually) a Compression node that bundles all attachments into a single zip.

### Add the If node

1. Search **If** → drop on canvas → rename `Check X Files`.
2. Condition:
   - Type → **Boolean**
   - Operation → **is true**
   - Value 1 → `={{ $json.hasFiles }}`

The **true** output will go through the Compression node; the **false** output goes directly to the no-files HTTP node.

### Add the Compression node

1. Search **Compression** → drop on canvas → rename `Compress Files`.
2. Configure:
   - **Operation** → _Compress_
   - **Binary Property Name** → expression mode → `={{ $json.binaryKeys }}` (the comma-separated list your Prepare-Data node returned)
   - **Output Format** → _zip_
   - **File Name** → e.g. `report-files.zip`
   - **Put Output File in Field** → choose the field name your partner expects, e.g. `user_file`. Remember this name — Step 4 will reference it.

---

## Step 4 — Add the HTTP Request node

This is the actual API call.

1. Search **HTTP Request** → drop on canvas → rename `Submit to X` (or `Submit X with File` if it's the file-bearing variant).
2. **Method** → typically `POST`.
3. **URL** → expression mode → `={{ $json.apiUrl }}` (taken from your Prepare-Data node).
4. **Authentication**:
   - Open the dropdown.
   - For Bearer-token APIs choose _Generic Credential Type_ → _Header Auth_.
   - If n8n ships a built-in credential for the vendor, choose _Predefined Credential Type_ and pick it.
   - Click the credential picker → **+ Create New**. Give it a clear name (e.g. `Partner X Auth`), enter the header name (typically `Authorization`) and value (typically `Bearer xxx`), save.
5. **Send Headers** → toggle on. Add at minimum:
   - `Accept` → `application/json`
6. **Send Body** → toggle on. Choose the body type:

   **JSON body**
   - _Body Content Type_ → _JSON_
   - _Specify Body_ → _Using JSON_
   - Value (expression mode) → `={{ $json.payload }}` _(or whatever key your Prepare-Data node returned)_

   **Multipart with file**
   - _Body Content Type_ → _Form-Data Multipart_
   - For each scalar field, click **Add Parameter** and set value to e.g. `={{ $json.payload.fieldName }}`
   - For the file, click **Add Parameter**:
     - _Parameter Type_ → **n8n Binary File**
     - _Name_ → the field name the partner expects (e.g. `user_file`)
     - _Input Data Field Name_ → the same name you put in the Compression node's _Put Output File in Field_ (e.g. `user_file`)

7. **Options** (expand the section at the bottom):
   - _Response_ → _Response_ → enable **Full Response** (so failures surface with status code + body).
   - _Timeout_ → `30000` (the default is too short for slow partners; 30 s matches the existing nodes).

---

## Step 5 — Wire the connections

Drag connection lines (from the small dot on the right of one node to the left of the next):

- **Always-on**: `Combine Report with Files` → `Prepare X Data` → `Submit to X`.
- **Stakeholder-gated**: `Combine Report with Files` → `Check X Selected` (true output) → `Prepare X Data` → `Submit to X`.
- **With file branch**: `Prepare X Data` → `Check X Files`. The _true_ output → `Compress Files` → `Submit X with File`. The _false_ output → `Submit to X`.

Leave any unused branch outputs (e.g. the _false_ output of `Check X Selected`) disconnected — n8n will simply do nothing on that path.

---

## Step 6 — Cosmetic conventions

These are not required for the workflow to work, but they keep the canvas readable as more integrations are added.

- **Position** new branches _below_ the existing ones. CERT sits around y≈500; put your new branch at y≈700 or lower.
- **Naming**: use `Prepare X Data`, `Check X Selected`, `Check X Files`, `Submit to X`, `Submit X with File`. Future maintainers will scan-read for these.
- **Sticky note**: add a yellow Sticky Note (search **Sticky Note** in the side panel) above your branch. State the partner, the endpoint, the credential type, and any quirks. Look at the HF and CERT notes for tone and length.

---

## Step 7 — Test in the editor

Do not just re-activate the workflow — test it manually first.

1. Click **Execute Workflow** at the top of the editor. n8n will wait for a webhook event, or you can pin sample data on the Webhook node and replay.
2. Alternatively, open the **Webhook** node and click **Listen for Test Event**, then POST a real Strapi payload from your browser or `curl`.
3. After the run, click each new node and inspect the _Output_ tab:
   - Prepare-Data: did the payload come out shaped correctly?
   - Compression (if used): is there a `user_file` (or your chosen name) in the binary panel?
   - HTTP Request: status 2xx? Response body present?
4. Test both branches:
   - With files attached AND with no files attached.
   - For gated integrations: with the stakeholder selected AND with it deselected (the latter should skip your branch entirely).
5. When all paths look good, toggle the workflow back to **Active** in the top-right.

---

## Updating the n8n env variable on Strapi Cloud

Strapi sends reports to n8n via a webhook URL stored in an environment variable (typically `N8N_WEBHOOK_URL`). When you deploy a new n8n workflow, rotate the webhook, or move between test/prod n8n instances, update this variable on Strapi Cloud.

1. Log in to [Strapi Cloud](https://cloud.strapi.io/) and open the project.
2. Go to **Settings** → **Variables** (left sidebar under the project).
3. Find the `N8N_WEBHOOK_URL` row (or click **Add new variable** if it does not exist yet):
   - **Name** → `N8N_WEBHOOK_URL`
   - **Value** → the production webhook URL from n8n (in the n8n editor, open the Webhook node → copy the **Production URL**, _not_ the Test URL — Test URLs only fire while the editor is open).
   - **Environment** → select the environments that should receive the change (usually _Production_; repeat for _Development_ if you maintain separate n8n instances).
4. Click **Save**. Strapi Cloud will prompt to redeploy — confirm, since env-variable changes only take effect after a redeploy.
5. Wait for the deploy to finish (watch the **Deployments** tab), then verify:
   - Submit a test report from the frontend.
   - Open the n8n workflow → **Executions** tab → confirm a new execution appeared with the expected payload.

**Heads-up:** the n8n workflow must be toggled **Active** for the production webhook URL to accept incoming requests. If Strapi reports succeed but n8n shows no executions, check the active toggle first.

---

## Common pitfalls

- **JSON built in HTTP-node expressions.** Symptom: random fields missing in the partner's intake, no error in n8n. Fix: assemble the payload inside the Code node and pass a single object/string into the HTTP node.
- **Binaries vanish before the HTTP node.** Symptom: multipart upload arrives but the file part is empty. Fix: in the Code node, copy `output.binary = { ...$('Combine Report with Files').first().binary }`.
- **Send Headers / Send Body toggles left off.** Symptom: 401, 415, or "missing field" from the partner. The toggles are easy to miss because they collapse the whole section.
- **Default timeout too short.** Symptom: intermittent failures on slow partners. Always set Options → Timeout to at least `30000`.
- **Forgot to wire from `Combine Report with Files`.** Symptom: the new branch never executes, no error message. Verify by clicking on your first node and looking at the input — it should be empty if not wired.
- **Activated the workflow before testing.** Symptom: real Strapi events trigger half-built integrations. Always toggle to _Inactive_ before editing, _Active_ only after a green test run.

---

## Reference: data on `$json` after `Combine Report with Files`

Your `Prepare X Data` node receives this on `$input.first().json`:

| Field                 | Description                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| `reportId`            | Stable identifier for this submission (used for filenames, idempotency keys).                      |
| `documentId`          | Strapi document ID.                                                                                |
| `entryId`             | Strapi numeric entry ID.                                                                           |
| `timestamp`           | ISO timestamp from Strapi or generated at receipt.                                                 |
| `metadata`            | Free-form metadata bag from the form.                                                              |
| `reporterDetails`     | Reporter org, contact, listed systems.                                                             |
| `incidentDescription` | Issue description, policy violation references.                                                    |
| `evidence`            | Steps to reproduce, supporting links.                                                              |
| `impactAssessment`    | Severity, prevalence, harm types, affected stakeholders.                                           |
| `securityDetails`     | Discovery narrative, attacker objectives, attacker resources.                                      |
| `disclosurePlan`      | Public disclosure intent, timeline, embargo info.                                                  |
| `classifyReport`      | Real-world-harm and malicious-use flags.                                                           |
| `reviewReport`        | `selectedStakeholders` lives here — read it for opt-in gating.                                     |
| `fullFormData`        | The complete original form payload, untouched. Use this when the partner wants the raw submission. |
| `hasFiles`            | Boolean — true if any attachments were uploaded.                                                   |
| `fileCount`           | Number of attached files.                                                                          |
| `fileMetadata`        | Array of `{ index, fileName, mimeType, size }`.                                                    |
| `binaryKeys`          | Comma-separated list of binary property names (used by the Compression node).                      |

And on `$binary` (only if `hasFiles` is true): one entry per uploaded file, keyed `file_0`, `file_1`, …, each containing the downloaded contents from Strapi.
