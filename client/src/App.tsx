import { BrowserRouter, Route, Routes } from "react-router-dom";
import FlightProvider from "./context/FlightContext";
import { FlightBoard, Login } from "./pages";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <FlightProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/flights" element={<FlightBoard />} />
        </Routes>
      </FlightProvider>
    </BrowserRouter>
  );
}

export default App;
