import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && value) {
      if (editorRef.current.getContent() !== value) {
        editorRef.current.setContent(value);
      }
    }
  }, [value]);

  const handleEditorChange = (content: string, editor: any) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="0lmixtwmc0d3fqrrj5q05glw2yycoy5cpskqu0azgrgnqcum"
      onInit={(_evt, editor) => {
        editorRef.current = editor;
        if (value) {
          editor.setContent(value);
        }
      }}
      onEditorChange={handleEditorChange}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic underline strikethrough forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | " +
          "link image media table | " +
          "removeformat | help | code | fullscreen",
        content_css: "default",
        content_style:
          "body {   font-family: Inter, ui-sans-serif, system-ui, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; font-size: 1rem; line-height: 1.5; color: #374151; }",
      }}
    />
  );
});

export default RichTextEditor;
