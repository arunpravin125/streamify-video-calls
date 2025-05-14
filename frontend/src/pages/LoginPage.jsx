import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShipWheelIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../lib/api";
import { Link } from "react-router";
import { useLoginHook } from "../hooks/useLogin";
// C:\Users\ADMIN\Documents\Streamify\frontend\src\hooks\useLogin.js

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const queryClient = useQueryClient();

  const { loginMutate, isPending, error } = useLoginHook();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginData);
    loginMutate(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Login */}
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <ShipWheelIcon className="text-primary size-9" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>
          {/* error message displayed */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full ">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welocome Back</h2>
                  <p className="text-sm opacity-75">
                    Sign in to your account to continue your language journey
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                  </div>
                  <input
                    type="email"
                    placeholder="hello@gmail.com"
                    className="input input-bordered w-full"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                  </div>
                  <input
                    type="password"
                    placeholder="******"
                    className="input input-bordered w-full"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account ? {""}
                      <Link to="/signup" className="text-primary">
                        Create one
                      </Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* IMgae section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center ">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2>Connect with language partners worldwide</h2>
              <p>
                Practice conversation,make friends, and impove your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
