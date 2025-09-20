import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DemoForma from "./DemoForma";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<DemoForma />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
