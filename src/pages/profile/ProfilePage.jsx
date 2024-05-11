import React, { useEffect, useMemo } from "react";
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateProfile } from "../../services/index/users";
import ProfilePicture from "../../components/ProfilePicture";
import { userActions } from "../../store/reducers/userReducers";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },

    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
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
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),

    mode: "onChange",
  });

  const submitHandler = ({ name, email, password }) => {
    mutate({ name, email, password });
  };

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
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className={`placeholder:text-[#959ead] font-semibold mt-3 rounded-lg px-5 py-4 block outline-none border  ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || updateProfileIsLoading}
              className="w-full px-8 py-4 mb-6 text-lg font-bold text-white rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
