import { Routes } from "react-router";
import { WordleRoutes } from "./pages/wordle/WordleRoutes.jsx";

const MainRoutes = () => {
  return <Routes>{WordleRoutes}</Routes>;
};

export default MainRoutes;
