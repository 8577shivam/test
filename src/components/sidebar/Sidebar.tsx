import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-[20%] border-r border-slate-500 pb-2 flex flex-col gap-2 bg-gray-800 ">
      <div
        className={`cursor-pointer py-3 px-8 border-b border-yellow-200  ${
          isActive("/contacts") ? "font-semibold" : ""
        }`}
        onClick={() => navigate("/contacts")}
      >
        <p className="text-center text-xl text-yellow-50">Contact</p>
      </div>
      <div
        className={`cursor-pointer py-3 px-8 border-b border-yellow-200 ${
          isActive("/map") ? "font-semibold" : ""
        }`}
        onClick={() => navigate("/map")}
      >
        <p className="text-center text-xl text-yellow-50">Map</p>
      </div>
    </div>
  );
};

export default SideBar;
