import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DemoForma from "./DemoForma";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="register" element={<DemoForma />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
