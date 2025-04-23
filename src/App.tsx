import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load role-based pages
const SupplierDashboard = lazy(() => import("./pages/supplier"));
const SurveyorDashboard = lazy(() => import("./pages/surveyor"));
const WarehouseDashboard = lazy(() => import("./pages/warehouse"));
const AdminDashboard = lazy(() => import("./pages/admin"));
const DireksiDashboard = lazy(() => import("./pages/direksi"));
const SuperAdminDashboard = lazy(() => import("./pages/super-admin"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/supplier" element={<SupplierDashboard />} />
          <Route path="/surveyor" element={<SurveyorDashboard />} />
          <Route path="/warehouse" element={<WarehouseDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/direksi" element={<DireksiDashboard />} />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
