import { useNavigate } from "react-router-dom";
import FileUpload from "../src/component/FileUpload";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Experian Soft Credit Report</h1>
      <FileUpload onUploadSuccess={() => navigate("/report")} />
    </div>
  );
};

export default Home;
