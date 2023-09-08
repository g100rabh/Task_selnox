import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "./TextEditor.css"; // You can create this CSS file for styling
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = () => {
  return (
    <Editor
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      className="editor"
    />
  );
};

export default TextEditor;
