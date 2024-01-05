import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";

import draftjsToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import FirstRow from "./rows/FirstRow";
import SecondRow from "./rows/SecondRow";
import ThirdRow from "./rows/ThirdRow";
import FourthRow from "./rows/FourthRow";
import FifthRow from "./rows/FifthRow";
import ButtonContainer from "./ButtonContainer";

import { postData } from "../../api/postData";
import { putData } from "../../api/putData";

import { replaceEmptyPAndNewlines } from "../../utils/utils";
import { validateData } from "../../utils/validateData";

const initData = {
  mailType: null,
  mailTitle: null,
  mailContent: null,
  ismailIUse: null,
  reason: null,
};

export default function ContentSetting({
  handleDivClick,
  contents,
  handleOpenModal,
}) {
  const [isModify, setIsModify] = useState(false);
  const [contentsData, setContentsData] = useState(initData);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const [isCheckedValid, setIsCheckedValid] = useState({
    mailType: false,
    mailTitle: false,
    mailContent: false,
    ismailIUse: false,
    reason: false,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (contents !== null) {
      contents.mailContent = replaceEmptyPAndNewlines(contents.mailContent);
      setContentsData(contents);
      setIsModify(true);

      const newEditorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(contents.mailContent))
      );

      setEditorState(newEditorState);
    }
  }, [contents]);

  useEffect(() => {
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setConvertedContent(html);
    setContentsData((prev) => ({ ...prev, mailContent: html }));
  }, [editorState]);

  const postDataQuery = useMutation({
    mutationFn: (contents) => postData(contents),
    onSuccess: () => {
      queryClient.invalidateQueries("data");
    },
    onError: () => {
      console.error("post 에러 발생");
    },
  });

  const putDataQuery = useMutation({
    mutationFn: (contents) => putData(contents),
    onSuccess: () => {
      queryClient.invalidateQueries("data");
    },
    onError: () => {
      console.error("put 에러 발생");
    },
  });

  const handlerSaveButton = () => {
    const result = validateData(contentsData);
    if (Object.keys(result).length !== 0) {
      Object.keys(result).forEach((key) =>
        setIsCheckedValid((prev) => ({ ...prev, [key]: result[key] }))
      );
      return;
    }
    if (!isModify) {
      console.log("생성모드");
      postDataQuery.mutate(contentsData);
    } else {
      console.log("수정모드");
      putDataQuery.mutate(contentsData);
    }
    handleDivClick("save", 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContentsData((prev) => {
      if (type === "radio") {
        return { ...prev, [name]: checked ? value : null };
      }
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className={`${container}`} onClick={() => handleDivClick("window", 1)}>
      <div className={`${templateContainer}`}>
        <FirstRow
          contentsData={contentsData}
          isCheckedValid={isCheckedValid}
          handleInputChange={handleInputChange}
        />
        <SecondRow
          contentsData={contentsData}
          isCheckedValid={isCheckedValid}
          handleInputChange={handleInputChange}
        />
        <ThirdRow
          isCheckedValid={isCheckedValid}
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <FourthRow
          contentsData={contentsData}
          isCheckedValid={isCheckedValid}
          handleInputChange={handleInputChange}
        />
        <FifthRow
          handleOpenModal={handleOpenModal}
          convertedContent={convertedContent}
        />
      </div>
      <ButtonContainer
        handleDivClick={handleDivClick}
        handlerSaveButton={handlerSaveButton}
      />
    </div>
  );
}

const container =
  "flex text-[12px] flex-col items-center w-full h-full py-[20px] pl-[20px] pr-[30px]";

const templateContainer =
  "flex flex-[5] w-full flex-col border-[1px] border-BORDER border-solid";
