export const ACCESS_METHODS: string[] = [
  "Web App",
  "Official API",
  "Third-party tool/integration",
  "Mobile App",
  "Desktop App",
  "Browser Extension",
  "Other",
];

// Platform configuration with models and synonyms for matching
type PlatformConfig = {
  id: string;
  label: string;
  models: string[];
  synonyms: string[]; // Keywords for automatic platform detection
};

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  // AI Developers
  {
    id: "openai",
    label: "OpenAI (ChatGPT, API, Playground)",
    models: ["GPT-5", "o3-mini", "o1", "GPT-3.5-Turbo", "DALL-E-3"],
    synonyms: ["openai", "chatgpt", "gpt"],
  },
  {
    id: "google",
    label: "Google (Gemini, AI Studio, Bard)",
    models: ["Gemini-2.5-Pro", "Gemini-2.0", "Gemini-1.5", "Imagen-3", "Veo-2"],
    synonyms: ["google", "gemini", "bard", "vertex", "palm"],
  },
  {
    id: "anthropic",
    label: "Anthropic (Claude, API)",
    models: [
      "Claude-4-Opus",
      "Claude-4-Sonnet",
      "Claude-3.7-Sonnet",
      "Claude-3-Sonnet",
      "Claude-instant",
      "Claude-2",
    ],
    synonyms: ["anthropic", "claude", "bedrock"],
  },
  {
    id: "meta",
    label: "Meta (Meta AI, Llama)",
    models: [
      "Llama 3.1 70B",
      "Llama 3.1 8B",
      "Llama 3 70B",
      "Llama 3 8B",
      "Llama 2",
      "Code Llama",
    ],
    synonyms: ["meta", "llama", "meta ai"],
  },
  {
    id: "microsoft",
    label: "Microsoft (Copilot, Azure AI)",
    models: ["GPT-4o", "GPT-4", "GPT-3.5-Turbo", "DALL-E-3", "Copilot Pro"],
    synonyms: ["microsoft", "copilot", "azure"],
  },
  {
    id: "xai",
    label: "xAI (Grok)",
    models: ["Grok-4", "Grok-2"],
    synonyms: ["xai", "grok", "x.ai"],
  },

  // Platforms
  {
    id: "huggingface",
    label: "Hugging Face",
    models: [],
    synonyms: ["hugging face", "huggingface", "hf"],
  },
  {
    id: "groq",
    label: "Groq",
    models: ["Llama 3.1 70B", "Llama 3.1 8B", "Mixtral 8x7B", "Gemma 7B"],
    synonyms: ["groq"],
  },
  {
    id: "perplexity",
    label: "Perplexity AI",
    models: ["Perplexity Pro", "Perplexity Free"],
    synonyms: ["perplexity", "perplexity ai"],
  },
  {
    id: "cohere",
    label: "Cohere",
    models: ["Command", "Command Light", "Embed"],
    synonyms: ["cohere"],
  },
  {
    id: "replicate",
    label: "Replicate",
    models: ["Various Hosted Models", "Custom Models"],
    synonyms: ["replicate"],
  },
  {
    id: "together",
    label: "Together AI",
    models: ["Various Open Source Models", "Custom Models"],
    synonyms: ["together", "together ai"],
  },
  {
    id: "mistral",
    label: "Mistral",
    models: ["Mistral Large", "Mistral Medium", "Mistral Small", "Le Chat"],
    synonyms: ["mistral", "le chat"],
  },

  // Incident Databases
  {
    id: "ai-incident-db",
    label: "AI Incident Database",
    models: [],
    synonyms: ["ai incident database", "incident database"],
  },
  {
    id: "aiaaic",
    label: "AIAAIC Repository",
    models: [],
    synonyms: ["aiaaic", "aiaaic repository"],
  },
  {
    id: "avid",
    label: "AI Vulnerability Database (AVID)",
    models: [],
    synonyms: ["avid", "ai vulnerability database"],
  },
  {
    id: "oecd",
    label: "OECD AI Incidents Monitor",
    models: [],
    synonyms: ["oecd", "oecd ai incidents"],
  },

  // Government & Civil Society
  {
    id: "mozilla",
    label: "Mozilla 0Din",
    models: [],
    synonyms: ["mozilla", "0din", "odin"],
  },
  {
    id: "mitre-cve",
    label: "MITRE CVE",
    models: [],
    synonyms: ["mitre cve", "cve"],
  },
  {
    id: "mitre-atlas",
    label: "MITRE ATLAS",
    models: [],
    synonyms: ["mitre atlas", "atlas"],
  },
  {
    id: "cisa",
    label: "CISA",
    models: [],
    synonyms: ["cisa"],
  },
  {
    id: "cert",
    label: "CERT",
    models: [],
    synonyms: ["cert"],
  },
  {
    id: "nist",
    label: "NIST",
    models: [],
    synonyms: ["nist"],
  },
  {
    id: "us-ai-safety",
    label: "US AI Safety Institute",
    models: [],
    synonyms: ["us ai safety", "us ai safety institute", "aisi"],
  },
  {
    id: "uk-ai-security",
    label: "UK AI Security Institute",
    models: [],
    synonyms: ["uk ai security", "uk ai security institute"],
  },

  // Other
  {
    id: "other",
    label: "Other",
    models: [],
    synonyms: ["other"],
  },
] as const;

export const AI_PLATFORMS = PLATFORM_CONFIGS.map((p) => p.label);

export const PLATFORM_MODELS: Record<string, string[]> =
  PLATFORM_CONFIGS.reduce(
    (acc, config) => {
      acc[config.label] = config.models;
      return acc;
    },
    {} as Record<string, string[]>,
  );
