import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 flex justify-center text-orange-500">
            Contact Manager, Map and Chart
          </h1>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
