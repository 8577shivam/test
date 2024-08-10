import React from "react";
import SideBar from "../components/sidebar/Sidebar";
import MainSection from "../components/mainSection/MainSection";
import { useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  const getHeading = () => {
    if (pathname === "/contacts") return "Contact Page";
    if (pathname === "/map") return "Map Page";
    return "Please Choose a Section";
  };
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-green-400 p-4 flex justify-center">
        <p className="text-3xl font-bold">{getHeading()}</p>
      </div>  
      <div className="flex h-[500px] md:h-[800px] overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <SideBar />
        <MainSection />
      </div>
    </div>
  );
};

export default Home;
