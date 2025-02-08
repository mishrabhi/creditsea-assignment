import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Report from "../pages/Report";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-500 p-4 text-white flex justify-between">
          <Link to="/" className="text-lg font-semibold">
            Credit Report
          </Link>
          <Link to="/reports" className="hover:underline">
            View Reports
          </Link>
        </nav>
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Report />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
