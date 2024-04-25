import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";

const RegisterPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({
        name,
        email,
        password,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState) {
      navigate("/");
    }
  }, [navigate, userState, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="container px-5 py-10 mx-auto">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="mb-8 text-2xl font-bold text-center text-dark-hard">
            Sign Up
          </h1>
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
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                className={`placeholder:text-[#959ead] font-semibold mt-3 rounded-lg px-5 py-4 block outline-none border  ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Passwords do not match";
                    }
                  },
                })}
              />
              {errors.confirmPassword?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <Link
              to="/forget-password"
              className="text-sm font-semibold text-primary "
            >
              Forgot password?
            </Link>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full px-8 py-4 my-6 text-lg font-bold text-white rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              You have account?{" "}
              <Link to="/login" className="text-primary">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
