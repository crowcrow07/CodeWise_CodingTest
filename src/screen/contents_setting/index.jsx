export default function ContentSetting({ handleDivClick }) {
  return (
    <div className="w-full h-full" onClick={() => handleDivClick("window", 2)}>
      컨텐츠 설정입니다.
    </div>
  );
}
