import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    title: "news title",
    text: "first news text ssads asddasdd ssadsd sda sdsa",
    imgSrc: require("../images/union/News/slide2-b.jpg"),
    activeNews: false,
    id: 3,
  },
  {
    title: "news title",
    text: "second news text ghgfh hjfhj ssadsd sda sdsa",
    imgSrc: require("../images/union/News/image3.jpg"),
    activeNews: false,
    id: 2,
  },
  {
    title: "news title",
    text: "third news text ghdh asddasdd dfd sda sdsa",
    imgSrc: require("../images/union/News/image2.jpg"),
    activeNews: false,
    id: 1,
  },
  {
    title: "last news title",
    text: `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    imgSrc: require("../images/union/News/image1.jpg"),
    activeNews: true,
    id: 0,
  },
];

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getAllNews: (state) => {
      return state;
    },
    getSingleNews: (state, action) => {
      const singleNews = state.find((el) => el.id === Number(action.payload));
      return singleNews ? [singleNews] : []; // Return array for consistency
    },

    setActiveNews: (state, action) => {
      state.map((el) => (el.activeNews = false));
      state[action.payload].activeNews = true;
    },
    setPosition: (state, action) => {
      const moveSlide = action.payload;
      state.forEach((el) => {
        el.id = (el.id + moveSlide + state.length) % state.length;
        if (el.id === 0) {
          el.activeNews = true;
        } else {
          el.activeNews = false;
        }
      });
    },
  },
});

export const { getAllNews, setActiveNews, setPosition, getSingleNews } =
  newsSlice.actions;

export default newsSlice.reducer;