import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Payments from "./pages/Payments";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="layout">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
