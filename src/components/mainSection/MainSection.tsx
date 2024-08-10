import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Contact from "../contact/contact";
import Dashboard from "../mapchart/dashboard";
const MainSection: React.FC = () => {

  return (
    <div className="w-full flex flex-col border border-green-500">
      
      <div className="flex-1 h-[100%] overflow-scroll">
        <Routes>
          <Route path="contacts" element={<Contact />} />
          <Route path="map" element={<Dashboard />} />
          <Route path="*" element={<div className="text-3xl flex items-center justify-center font-bold text-white">Select a section from the sidebar.</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default MainSection;
