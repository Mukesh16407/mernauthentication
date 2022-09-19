import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { VerifyEmail } from "./pages/verifyEmail";

import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="/verifyemail/:token"
          element={
            <PublicRoutes>
              <VerifyEmail />
            </PublicRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export function ProtectedRoutes({ children }) {
  const user = localStorage.getItem("user");
  if (user !== "" && user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function PublicRoutes({ children }) {
  const user = localStorage.getItem("user");
  if (user !== "" && user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default App;
