import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Build from "./pages/Build";
import Writing from "./pages/Writing";
import Book from "./pages/Book";
import Photography from "./pages/Photography";
import Story from "./pages/Story";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Build />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/book" element={<Book />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/story" element={<Story />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
