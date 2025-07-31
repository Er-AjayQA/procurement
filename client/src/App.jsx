import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { ProtectedRoute } from "./components/routeProtection";
import { HomeLayout } from "./components/layouts/homeLayout";
import { PageNotFound } from "./pages/pageNotFound";
import { ModulePage } from "./pages/modulePage";

function App() {
  return (
    <>
      <div className="bg-[#E5E5E5]">
        <Routes>
          <Route path="/procurement" element={<ProtectedRoute />}>
            <Route path="sign-in" element={<LoginPage />} />
            <Route element={<HomeLayout />}>
              <Route path="home" element={<HomePage />} />

              {/* Dynamic Routes Start */}
              <Route path=":module">
                <Route path=":submodule" element={<ModulePage />} />
              </Route>
              {/* Dynamic Routes End */}
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
