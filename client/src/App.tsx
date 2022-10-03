import { useEffect, useState } from "react";
import FlightProvider from "./context/FlightContext";
import { FlightBoard } from "./pages";

function App() {
  return (
    <div className="app">
      <FlightProvider>
        <FlightBoard />
      </FlightProvider>
    </div>
  );
}

export default App;
