import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import FlightProvider from "./context/FlightContext";
import { FlightBoard, Login } from "./pages";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <FlightProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/flights" element={<FlightBoard />} />
          </Routes>
        </AuthProvider>
      </FlightProvider>
    </BrowserRouter>
  );
}

export default App;
