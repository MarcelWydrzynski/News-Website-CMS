import React, { useState, useRef, useEffect } from "react";

type RichTextEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
};

const toolbarButtons = [
  { command: "bold", label: "B" },
  { command: "italic", label: "I" },
  { command: "underline", label: "U" },
  { command: "strikeThrough", label: "S" },
  { command: "insertOrderedList", label: "OL" },
  { command: "insertUnorderedList", label: "UL" },
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value = "", onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(value);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      setContent(value);
    }
  }, [value]);

  const execCommand = (command: string) => {
    document.execCommand(command, false);
    // update content after command execution
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setContent(html);
      onChange?.(html);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setContent(html);
      onChange?.(html);
    }
  };

  return (
    <div className="rich-text-editor" style={{ border: "1px solid #ccc", borderRadius: 6 }}>
      <div
        className="toolbar"
        style={{
          backgroundColor: "#f3f4f6", // light gray matching typical Tailwind bg-gray-100
          borderBottom: "1px solid #ccc",
          padding: "6px 8px",
          display: "flex",
          gap: 8,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        {toolbarButtons.map(({ command, label }) => (
          <button
            key={command}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault(); // prevent focus loss
              execCommand(command);
            }}
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: 4,
              padding: "4px 8px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#111827", // matching Tailwind text-gray-900
              userSelect: "none",
            }}
            aria-label={command}
            title={command}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{
          minHeight: 120,
          padding: 12,
          outline: "none",
          fontSize: 16,
          backgroundColor: "white",
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          color: "#111827", // text-gray-900
          overflowY: "auto",
        }}
      />
    </div>
  );
};

export default RichTextEditor;
