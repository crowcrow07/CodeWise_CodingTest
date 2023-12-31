import Sidebar from "./components/sidebar/Sidebar";
import ResizeDragZone from "./components/resizeDragZone/ResizeDragZone";

function App() {
  const DATA = [
    {
      id: 1,
      title: "컨텐츠 목록",
      location: { X: 0, Y: 0 },
      area: { W: 240, H: 120 },
      init: { BOUNDARY_MARGIN: 12, MIN_W: 80, MIN_H: 80 },
    },
    {
      id: 2,
      title: "컨텐츠 설정",
      location: { X: 0, Y: 0 },
      area: { W: 120, H: 240 },
      init: { BOUNDARY_MARGIN: 12, MIN_W: 100, MIN_H: 100 },
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ResizeDragZone data={DATA} />
    </div>
  );
}

export default App;
