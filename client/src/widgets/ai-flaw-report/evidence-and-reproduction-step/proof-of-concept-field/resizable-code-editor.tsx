import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

import { CodeEditorStyles } from "./code-editor-styles";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDark: boolean;
  minHeight?: number;
};

export function ResizableCodeEditor({
  value,
  onChange,
  placeholder,
  isDark,
  minHeight = 184,
}: Props) {
  const highlightCode = (code: string) => {
    try {
      const grammar = languages.typescript ?? languages.javascript;
      return grammar ? highlight(code, grammar, "typescript") : code;
    } catch {
      return code;
    }
  };

  return (
    <div
      className={[
        "rsce-field",
        "relative resize-y overflow-auto",
        "min-h-[184px]",
        "rounded-md border border-gray-300 dark:border-gray-300",
        "bg-white dark:bg-gray-800",
        "focus-within:ring-2 focus-within:ring-indigo-500",
      ].join(" ")}
      style={{ minHeight }}
    >
      <Editor
        value={value}
        onValueChange={onChange}
        padding={16}
        placeholder={placeholder}
        highlight={highlightCode}
        className={[
          "font-mono text-base leading-6 whitespace-pre",
          "h-full w-full",
          isDark ? "text-gray-100" : "text-gray-900",
        ].join(" ")}
        style={{ outline: "none" }}
      />

      <CodeEditorStyles isDark={isDark} />
    </div>
  );
}
