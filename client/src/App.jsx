import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <>
      <div className="bg-[#E5E5E5]">
        <Routes>
          <Route path="/procurement/sign-in" element={<LoginPage />} />
          <Route path="/procurement/home" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
