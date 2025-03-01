import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ defaultValue = "", onChange = () => {} }) {
  return (
    <div className="w-full">
      <Editor
        initialValue={defaultValue}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | removeformat | help",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }",
        }}
        onEditorChange={(content) => onChange(content)}
      />
    </div>
  );
}
