import Sidebar from "../pages/Sidebar"; // path adjust करो अगर जरूरत हो
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;