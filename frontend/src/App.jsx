import { Navigate, Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/authentication/SignUpPage";
import LoginPage from "./pages/authentication/LoginPage";
import EmailVerificationPage from "./pages/authentication/EmailVerificationPage";
// import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/authentication/ForgotPasswordPage";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";

import Home from "./pages/cms/Home";
import Layout from "./components/cms/Layout";
import Show from "./pages/cms/Show";
import InputDrama from "./pages/cms/InputDrama";
import Countries from "./pages/cms/Countries";
import Genres from "./pages/cms/Genres";
import Actors from "./pages/cms/Actors";
import Comments from "./pages/cms/Comments";
import Users from "./pages/cms/Users";

import LoadingSpinner from "./components/authentication/LoadingSpinner";

import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/drama/show" element={<Show />} />
          <Route path="/drama/new" element={<InputDrama />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
