import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from "./components/weather/Weather.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}