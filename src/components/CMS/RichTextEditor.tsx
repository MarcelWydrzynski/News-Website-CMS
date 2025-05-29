import React, { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const toolbarButtonClass = `
  px-3 py-1 rounded bg-[] border
  hover:bg-gray-100 hover:cursor-pointer
`;

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "<p><br></p>";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: "bold" | "italic") => {
    document.execCommand(command, false);
    handleInput();
  };

  return (
    <div className=" rounded-md  bg-[#374151]">
      <div className="flex gap-2 bg-[#374151] p-2 rounded-t-md border-b-1">
        <button
          type="button"
          className={toolbarButtonClass}
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("bold");
          }}
          aria-label="Bold"
          title="Bold"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={toolbarButtonClass}
          onMouseDown={(e) => {
            e.preventDefault();
            execCommand("italic");
          }}
          aria-label="Italic"
          title="Italic"
        >
          <em>I</em>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[150px] p-2 text-white font-sans text-base leading-relaxed outline-none "
        style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        spellCheck={true}
      />
    </div>
  );
};

export default RichTextEditor;
