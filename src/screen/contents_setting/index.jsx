import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";

import { postData } from "../../api/postData";
import { putData } from "../../api/putData";
import { windowImg } from "../../assets/images";
import { replaceEmptyPAndNewlines } from "../../utils/utils";
import { validateData } from "../../utils/validateData";
import Button from "../../ui/Button";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
  // false면 생성모드 true면 수정모드
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
    onSettled: () => {
      // console.log("암튼 실행");
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
    onSettled: () => {
      // console.log("암튼 실행");
    },
  });

  const handlerSaveButton = () => {
    // 유효성 검사
    const result = validateData(contentsData);
    console.log(result);
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
        <div className={`${firstRow}`}>
          <div className="flex-[2] flex h-full">
            <div className={`${templateHeader}`}>메일 유형</div>
            <div className="flex-[1] flex items-center px-[5px]">
              <input
                name="mailType"
                className={`w-full h-[30px] px-[10px] rounded-[5px] ${
                  contentsData.mailType && "bg-green-100"
                } ${isCheckedValid.mailType && "!bg-red-100"}`}
                value={contentsData.mailType}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex-[1] flex h-full">
            <div className={`${templateHeader}`}>메일 사용여부</div>
            <div
              className={`flex-[1] flex items-center px-[15px] min-w-[130px] ${
                contentsData.ismailIUse && "bg-green-100"
              } ${isCheckedValid.ismailIUse && "!bg-red-100"}`}
            >
              <label className="flex items-center mr-[10px] cursor-pointer">
                <input
                  className="mr-1 cursor-pointer"
                  type="radio"
                  name="ismailIUse"
                  checked={contentsData.ismailIUse === "Y"}
                  value="Y"
                  onChange={handleInputChange}
                />{" "}
                사용
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  className="mr-1 cursor-pointer"
                  type="radio"
                  name="ismailIUse"
                  checked={contentsData.ismailIUse === "N"}
                  value="N"
                  onChange={handleInputChange}
                />{" "}
                미사용
              </label>
            </div>
          </div>
        </div>
        <div className={`${secondRow}`}>
          <div className={`${templateHeader}`}>메일 발송 제목</div>
          <div className="flex-[1] flex items-center px-[5px]">
            <input
              name="mailTitle"
              className={`w-full h-[30px] px-[10px] rounded-[5px] bg-INPUT border-BORDER border-[1px] ${
                contentsData.mailTitle && "bg-green-100"
              } ${isCheckedValid.mailTitle && "!bg-red-100"}`}
              value={contentsData.mailTitle}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div
          className={`${thirdRow} ${
            isCheckedValid.mailContent && "!bg-red-100"
          }`}
        >
          <div className="flex w-full">
            <div className={`${templateHeader}`}>메일 내용</div>
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
        <div className={`${fourthRow}`}>
          <div className={`${templateHeader}`}>변경 사유</div>
          <div className="flex-[1] flex items-center px-[5px]">
            <input
              name="reason"
              className={`w-full h-[30px] px-[10px] rounded-[5px] bg-INPUT border-BORDER border-[1px] ${
                contentsData.reason && "bg-green-100"
              } ${isCheckedValid.reason && "!bg-red-100"}`}
              placeholder="argument 변경시 에러가 발생하오니 주의하시기 바랍니다."
              value={contentsData.reason}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={`${fifthRow}`}>
          <Button
            onClick={() => handleOpenModal(convertedContent)}
            className={`!w-[100px] h-[26px] mr-[5px]`}
          >
            <img className="mr-[2px]" alt="logo" src={windowImg.preView} />
            미리보기
          </Button>
        </div>
      </div>
      <div className={`${buttonContainer}`}>
        <Button
          onClick={() => handleDivClick("close", 1)}
          className={`mr-[10px] ${buttonStyle}`}
        >
          창닫기
        </Button>
        <Button
          onClick={handlerSaveButton}
          className={`${buttonStyle} !bg-BLACK text-white active:bg-BLACK`}
        >
          저장
        </Button>
      </div>
    </div>
  );
}

const container =
  "flex text-[12px] flex-col items-center w-full h-full py-[20px] pl-[20px] pr-[30px]";

const templateContainer =
  "flex flex-[5] w-full flex-col border-[1px] border-BORDER border-solid";

const templateHeader =
  "w-[120px] bg-SETTING_HEADER flex justify-center items-center text-white";

const firstRow =
  "h-[40px] border-b-[1px] border-BORDER border-solid flex items-center";

const secondRow =
  "h-[40px] w-full flex border-b-[1px] border-BORDER border-solid";

const thirdRow = "flex h-[350px] border-b-[1px] border-BORDER border-solid";

const fourthRow = "h-[40px] flex border-b-[1px] border-BORDER border-solid";

const fifthRow = "h-[40px] flex items-center justify-end bg-INPUT";

const buttonContainer = "flex h-[94px] items-center";

const buttonStyle = "!w-[130px] h-[34px] rounded-none";
