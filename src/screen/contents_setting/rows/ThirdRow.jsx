import { Editor } from "react-draft-wysiwyg";
import TableHeader from "../TableHeader";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function ThirdRow({
  isCheckedValid,
  editorState,
  setEditorState,
}) {
  return (
    <div
      className={`${thirdRow} ${isCheckedValid.mailContent && "!bg-red-100"}`}
    >
      <div className="flex w-full">
        <TableHeader>메일 내용</TableHeader>
        <div className="flex-[1] z-0">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            localization={{ locale: "ko" }}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
            }}
          />
        </div>
      </div>
    </div>
  );
}

const thirdRow = "flex h-[350px] border-b-[1px] border-BORDER border-solid";
