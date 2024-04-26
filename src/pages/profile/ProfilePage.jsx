import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../services/index/users";
import ProfilePicture from "../../components/ProfilePicture";

const ProfilePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData.name,
      email: profileIsLoading ? "" : profileData.email,
    },

    mode: "onChange",
  });

  const submitHandler = (data) => {};

  return (
    <MainLayout>
      <section className="container px-5 py-10 mx-auto">
        <div className="w-full max-w-sm mx-auto">
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] font-semibold mt-3 rounded-lg px-5 py-4 block outline-none border  ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name must be at least 1 character long",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />

              {errors.name?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className={`placeholder:text-[#959ead] font-semibold mt-3 rounded-lg px-5 py-4 block outline-none border  ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email",
                  },

                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className={`placeholder:text-[#959ead] font-semibold mt-3 rounded-lg px-5 py-4 block outline-none border  ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading}
              className="w-full px-8 py-4 mb-6 text-lg font-bold text-white rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
