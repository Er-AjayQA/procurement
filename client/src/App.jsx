import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { ProtectedRoute } from "./components/routeProtection";
import { HomeLayout } from "./components/layouts/homeLayout";

function App() {
  return (
    <>
      <div className="bg-[#E5E5E5]">
        <Routes>
          <Route path="/procurement/sign-in" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<HomeLayout />}>
              <Route path="/procurement/home" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
