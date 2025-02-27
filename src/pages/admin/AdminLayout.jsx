import React, { useEffect } from "react";
import Header from "./components/header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const { data, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],

    onError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("You are not allowed to access admin panel.");
    },
  });

  useEffect(() => {
    if (data && !data?.admin) {
      toast.error("You are not allowed to access admin panel.");
      navigate("/");
      
    }
  }, [data, data?.admin, navigate]);

  if (profileIsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h3 className="text-2xl text-slate-700">Loading...</h3>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminLayout;
