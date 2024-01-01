import { windowImg } from "../assets/images";

export const DATA = [
  {
    id: 0,
    header: {
      title: "컨텐츠 목록",
      icon: windowImg.baseline,
    },

    location: { X: 0, Y: 0 },
    area: { W: 500, H: 500 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 500, MIN_H: 500 },
  },
  {
    id: 1,
    header: {
      title: "컨텐츠 설정",
      icon: null,
    },

    location: { X: 0, Y: 0 },
    area: { W: 500, H: 500 },
    init: { BOUNDARY_MARGIN: 12, MIN_W: 500, MIN_H: 500 },
  },
];
