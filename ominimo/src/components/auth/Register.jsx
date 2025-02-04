import { useRegister } from "@/hooks/auth";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { register: signup, isLoading } = useRegister();

  async function handleRegister(data) {
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirm,
      redirectTo: "/",
    });
  }

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="w-[300px] h-[400px] border-solid border-gray-200 border-[1px] rounded-2xl flex flex-col items-start gap-4">
          <p
            className="text-3xl font-[apple-semibold]"
            style={{ fontSize: "2rem", fontWeight: 600 }}
          >
            Register
          </p>

          <input
            type="text"
            {...register("name")}
            style={{
              backgroundColor: "#333333",
              paddingLeft: "12px",
              borderRadius: "8px",
              marginTop: "30px",
            }}
            className="border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black"
            placeholder="Name"
          />

          <input
            type="email"
            {...register("email")}
            style={{
              backgroundColor: "#333333",
              paddingLeft: "12px",
              borderRadius: "8px",
            }}
            className="border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black"
            placeholder="E-mail"
          />

          <input
            type="password"
            {...register("password")}
            style={{
              backgroundColor: "#333333",
              paddingLeft: "12px",
              borderRadius: "8px",
            }}
            className="border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black"
            placeholder="Password"
          />

          <input
            type="password"
            {...register("passwordConfirm")}
            style={{
              backgroundColor: "#333333",
              paddingLeft: "12px",
              borderRadius: "8px",
            }}
            className="border-gray-500 border border-solid border-b-1 border-l-0 border-r-0 border-t-0 w-full h-[40px] focus:outline-none focus:border-black"
            placeholder="Confirm Password"
          />

          <Button
            sx={{
              backgroundColor: "#032fe8",
              height: "40px",
              width: "full",
              borderRadius: "8px",
              textColor: "white",
              cursor: "pointer",
              fontWeight: "thin",
            }}
            _hover={{}}
            isLoading={isLoading}
            type="submit"
            className="w-full h-[40px] flex justify-center items-center text-white cursor-pointer mt-5"
            style={{ borderRadius: "8px" }}
          >
            {isLoading ? (
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.825 21.75h10.35c.927 0 1.666-.764 1.566-1.643-.645-5.67-4.491-5.576-4.491-8.107 0-2.531 3.895-2.39 4.49-8.107.094-.88-.638-1.643-1.566-1.643H6.825c-.928 0-1.658.763-1.566 1.643C5.854 9.61 9.75 9.422 9.75 12c0 2.578-3.846 2.438-4.49 8.107-.1.88.638 1.643 1.566 1.643Z"></path>
                <path
                  fill="#000000"
                  stroke="none"
                  d="M16.091 20.25H7.927c-.731 0-.937-.844-.424-1.367 1.24-1.258 3.746-2.159 3.746-3.602V10.5c0-.93-1.781-1.64-2.883-3.15-.182-.249-.164-.6.299-.6h6.69c.394 0 .48.348.3.598-1.086 1.511-2.906 2.217-2.906 3.152v4.781c0 1.431 2.612 2.203 3.769 3.603.466.565.303 1.366-.427 1.366Z"
                ></path>
              </svg>
            ) : (
              <p className="font-[apple] text-black">Register</p>
            )}
          </Button>

          <p
            className="text-center text-gray-400 mt-2"
            style={{ fontSize: "0.8rem" }}
          >
            Already have an account?{" "}
            <span
              className="text-white cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
