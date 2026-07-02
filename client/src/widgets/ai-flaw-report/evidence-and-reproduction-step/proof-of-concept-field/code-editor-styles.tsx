type Props = {
  isDark: boolean;
};

export function CodeEditorStyles({ isDark }: Props) {
  return (
    <>
      <style jsx global>{`
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: ${isDark ? "#9ca3af" : "#6b7280"};
          font-style: italic;
        }

        .token.string,
        .token.attr-value {
          color: ${isDark ? "#4ade80" : "#16a34a"};
        }

        .token.number,
        .token.boolean {
          color: ${isDark ? "#facc15" : "#ca8a04"};
        }

        .token.keyword,
        .token.operator,
        .token.important {
          color: ${isDark ? "#60a5fa" : "#2563eb"};
          font-weight: 600;
        }

        .token.function,
        .token.class-name {
          color: ${isDark ? "#a78bfa" : "#7c3aed"};
          font-weight: 500;
        }

        .token.property,
        .token.variable,
        .token.constant {
          color: ${isDark ? "#fb923c" : "#ea580c"};
        }

        .token.tag,
        .token.selector {
          color: ${isDark ? "#f87171" : "#dc2626"};
        }

        .token.attr-name {
          color: ${isDark ? "#fbbf24" : "#d97706"};
        }

        .token.punctuation {
          color: ${isDark ? "#d1d5db" : "#4b5563"};
        }

        .token.regex {
          color: ${isDark ? "#2dd4bf" : "#0d9488"};
        }

        .token.parameter {
          color: ${isDark ? "#fca5a5" : "#f87171"};
          font-style: italic;
        }

        .token.builtin,
        .token.type-annotation,
        .token.return-type {
          color: ${isDark ? "#34d399" : "#059669"};
        }

        .rsce-field::-webkit-resizer {
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
          border: none !important;
        }

        .rsce-field textarea {
          resize: none !important;
        }
      `}</style>

      <style jsx>{`
        .rsce-field::after {
          content: "";
          position: absolute;
          right: 6px;
          bottom: 6px;
          width: 13.47px;
          height: 13.05px;
          background-image: url("/icons/form/resize.svg");
          background-size: 13.47px 13.05px;
          background-position: center;
          background-repeat: no-repeat;
          pointer-events: none;
          opacity: 0.7;
          z-index: 10;
        }
      `}</style>
    </>
  );
}
