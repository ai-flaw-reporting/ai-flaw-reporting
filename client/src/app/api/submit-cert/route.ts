import { type NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { convertToCert } from "~/entities/ai-flaw-report/lib/cert-converter";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";

const execFileAsync = promisify(execFile);

const VINCE_API_URL =
  process.env.VINCE_API_URL ?? "https://kb.cert.org/vince/comm/api/vulreport/";
const VINCE_API_KEY = process.env.VINCE_API_KEY ?? "";

export async function POST(request: NextRequest) {
  if (!VINCE_API_KEY) {
    return NextResponse.json(
      { success: false, error: "VINCE_API_KEY is not configured" },
      { status: 500 },
    );
  }

  let body: { data: AiFlawReportSchema };
  try {
    body = (await request.json()) as { data: AiFlawReportSchema };
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const certData = JSON.parse(convertToCert(body.data)) as Record<
    string,
    unknown
  >;

  // -f: fail on HTTP 4xx/5xx, -s: suppress progress meter
  const curlArgs = ["-X", "POST", VINCE_API_URL, "-f", "-s", "-H", `Authorization: Token ${VINCE_API_KEY}`];

  for (const [key, value] of Object.entries(certData)) {
    if (key === "user_file") continue;

    let strValue: string;
    if (typeof value === "boolean") {
      // Django expects Python-style booleans: "True" / "False"
      strValue = value ? "True" : "False";
    } else if (value === null || value === undefined) {
      strValue = "";
    } else {
      strValue = String(value);
    }

    curlArgs.push("-F", `${key}=${strValue}`);
  }

  try {
    const { stdout, stderr } = await execFileAsync("curl", curlArgs, {
      timeout: 30_000,
    });

    console.log("CERT/VINCE response:", stdout);
    if (stderr) console.warn("CERT/VINCE stderr:", stderr);

    return NextResponse.json({
      success: true,
      response: stdout,
      ...(stderr && { stderr }),
    });
  } catch (error) {
    // curl -f exits non-zero on HTTP 4xx/5xx; capture the response body if available
    const body = error instanceof Error && "stdout" in error
      ? (error as NodeJS.ErrnoException & { stdout: string }).stdout
      : undefined;
    console.error("CERT/VINCE submission failed:", error, body ?? "");
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "curl execution failed",
        ...(body && { response: body }),
      },
      { status: 502 },
    );
  }
}
