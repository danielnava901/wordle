import { Route } from "react-router-dom";
import WordleContainer from "./WordleContainer.jsx";

export const WordleRoutes = [
  <Route key="wordl" path="wordl" element={<WordleContainer />}></Route>,
];
