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
    models: [
      "GPT-5.6 Sol",
      "GPT-5.6 Terra",
      "GPT-5.6 Luna",
      "GPT-5.5",
      "GPT-5.5 Pro",
      "GPT-5.4",
      "GPT-5.4 Pro",
      "GPT-5.4 Thinking",
      "GPT-5.4 mini",
      "GPT-5.4 nano",
      "GPT-5.3 Instant",
    ],
    synonyms: ["openai", "chatgpt", "gpt"],
  },
  {
    id: "google",
    label: "Google (Gemini, AI Studio, Vertex AI)",
    models: [
      "Gemini 3.5 Pro",
      "Gemini 3.5 Flash",
      "Gemini Omni",
      "Gemini Spark",
      "Gemini 3 Pro",
      "Gemini 3 Deep Think",
      "Veo 3.1",
      "Veo 3.1 Lite",
    ],
    synonyms: ["google", "gemini", "bard", "vertex", "palm", "deepmind", "gemma"],
  },
  {
    id: "anthropic",
    label: "Anthropic (Claude, API)",
    models: [
      "Claude Fable 5",
      "Claude Opus 4.8",
      "Claude Sonnet 4.6",
      "Claude Haiku 4.5",
    ],
    synonyms: ["anthropic", "claude", "bedrock", "fable"],
  },
  {
    id: "meta",
    label: "Meta (Meta AI, Llama, Muse Spark)",
    models: [
      "Llama 4 Behemoth",
      "Llama 4 Maverick",
      "Llama 4 Scout",
      "Llama 3.3 70B",
      "Muse Spark",
    ],
    synonyms: ["meta", "llama", "meta ai", "muse", "muse spark", "superintelligence labs"],
  },
  {
    id: "microsoft",
    label: "Microsoft (Copilot, Azure AI Foundry)",
    models: [
      "GPT-5.5",
      "GPT-5.4",
      "Claude Opus 4.8",
      "Claude Sonnet 4.6",
      "Copilot Pro",
      "Copilot Vision",
    ],
    synonyms: ["microsoft", "copilot", "azure", "foundry"],
  },
  {
    id: "xai",
    label: "xAI (Grok)",
    models: [
      "Grok 4.5",
      "Grok 4.3",
      "Grok Build 0.1",
      "Grok Imagine Video 1.5",
      "Grok Voice",
    ],
    synonyms: ["xai", "grok", "x.ai", "supergrok"],
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
    models: [
      "GPT-OSS 120B",
      "GPT-OSS 20B",
      "GPT-OSS-Safeguard 20B",
      "Llama 4 Scout",
      "Llama 4 Maverick",
      "Llama 3.3 70B",
      "Llama 3.1 8B",
      "Qwen 3 32B",
      "Kimi K2",
      "Whisper Large V3 Turbo",
      "Orpheus TTS",
      "Groq Compound",
    ],
    synonyms: ["groq", "groqcloud", "lpu"],
  },
  {
    id: "perplexity",
    label: "Perplexity AI",
    models: [
      "Sonar",
      "Sonar Pro",
      "Sonar Reasoning",
      "Sonar Reasoning Pro",
      "Sonar Deep Research",
    ],
    synonyms: ["perplexity", "perplexity ai", "sonar"],
  },
  {
    id: "cohere",
    label: "Cohere",
    models: [
      "Command A+",
      "Command A",
      "Command A Reasoning",
      "Command A Vision",
      "Command A Translate",
      "Command R+",
      "Command R",
      "Command R7B",
      "Aya Expanse",
      "Aya Vision",
      "Embed 4",
      "Rerank 3.5",
      "Cohere Transcribe",
    ],
    synonyms: ["cohere", "command", "aya"],
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
    models: [
      "Mistral Large 3",
      "Mistral Small 4",
      "Ministral 3 (14B / 8B / 3B)",
      "Magistral Medium",
      "Devstral 2",
      "Voxtral TTS",
      "Voxtral Mini Transcribe 2",
      "Mistral OCR 4",
      "Pixtral",
      "Le Chat",
    ],
    synonyms: ["mistral", "le chat", "magistral", "devstral", "voxtral", "ministral", "pixtral"],
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
