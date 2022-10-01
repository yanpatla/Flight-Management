import { useEffect, useState } from "react";
import { useStore } from "./hooks";
import { FlightBoard } from "./pages";

function App() {
  return (
    <div className="app">
      <FlightBoard />
    </div>
  );
}

export default App;
