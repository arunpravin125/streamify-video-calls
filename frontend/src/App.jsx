// import React, { useEffect, useState } from "react";
// import { Navigate, Route, Routes } from "react-router";
// import HomePage from "./pages/HomePage";
// import SignUpPage from "./pages/SignUpPage";
// import LoginPage from "./pages/LoginPage";
// import Notification from "./pages/Notification";
// import ChatPage from "./pages/ChatPage";
// import CallPage from "./pages/CallPage";
// import OnboardingPage from "./pages/OnboardingPage";
// import toast from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { axiosInstance } from "./lib/axios";
// import PageLoader from "./components/PageLoader";
// import { getAuthUser } from "./lib/api";
// import { useAuthUser } from "./hooks/useAuthUser";
// import Layout from "./components/Layout";
// import { useThemeStore } from "./store/useThemeStore";

// const App = () => {
//   const { isLoading, authUser } = useAuthUser();
//   console.log("data", authUser);
//   const { theme, setTheme } = useThemeStore();
//   // const authUser = authData?.user;
//   const isAuthenticated = Boolean(authUser);
//   console.log("isAuthenticated", isAuthenticated);
//   const isOnboarded = authUser?.isOnboarded;

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   if (isLoading) {
//     return <PageLoader />;
//   }

//   return (
//     <div className="h-screen w-full relative" data-theme={theme}>
//       <button onClick={() => setTheme("night")}>update to night</button>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Layout showSidebar="true">
//                 <HomePage />
//               </Layout>
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             !isAuthenticated ? (
//               <SignUpPage />
//             ) : (
//               <Navigate to={isOnboarded ? "/" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             !isAuthenticated ? (
//               <LoginPage />
//             ) : (
//               <Navigate to={isOnboarded ? "/" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/notification"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Layout showSidebar={true}>
//                 <Notification />
//               </Layout>
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/chat/:id"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Layout showSidebar={false}>
//                 <CallPage />
//               </Layout>
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/call/:id"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Layout showSidebar={false}>
//                 <ChatPage />
//               </Layout>
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />
//         <Route
//           path="/onboarding"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <Navigate to="/" />
//             ) : (
//               <>
//                 {" "}
//                 {isAuthenticated ? (
//                   <OnboardingPage />
//                 ) : (
//                   <Navigate to="/login" />
//                 )}{" "}
//               </>
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Notification from "./pages/Notification";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import OnboardingPage from "./pages/OnboardingPage";

import { useAuthUser } from "./hooks/useAuthUser";
import { useThemeStore } from "./store/useThemeStore";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme, setTheme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen w-full relative" data-theme={theme}>
      {/* Optional theme toggle button – remove if not needed */}
      <button onClick={() => setTheme("night")}>Switch to night theme</button>

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notification"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notification />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage /> {/* ✅ FIXED: correct component */}
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <CallPage /> {/* ✅ FIXED: correct component */}
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to="/" />
              ) : (
                <OnboardingPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
