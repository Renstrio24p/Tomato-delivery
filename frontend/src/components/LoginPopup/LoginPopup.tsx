import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "../Form/Form";
import { assets } from "@/assets/assets";
import { LoginState, Props, State } from "./types/Props.ts";
import axios from "@/server/api/axios.ts";
import { storeContext } from "@/context/StoreContext.tsx";
import { StoreContextValue } from "@/context/types/Context.js";

export default function LoginPopup({ setShowLogin }: Props) {
  const [currentState, setCurrentState] = useState<State>("Sign Up");
  const [data, setData] = useState<LoginState>({
    name: "",
    password: "",
    email: "",
    image: null,
  });
  const context = useContext<StoreContextValue | null>(storeContext);
  const setToken = context?.setToken;
  const setUserData = context?.setUserData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setData({
        ...data,
        image: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name!);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.image) {
      formData.append("image", data.image);
    }

    const apiUrl =
      currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";

    try {
      const res = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type":
            currentState === "Sign Up"
              ? "multipart/form-data"
              : "application/json",
        },
      });

      if (res.data) {
        const { token, ...userData } = res.data; // Assuming the response contains a token and user data
        if (token) {
          setToken && setToken(token); // Set token only if it exists and setToken is defined
          localStorage.setItem("token", token); // Store token
          setShowLogin(false);
          setUserData && setUserData(userData); // Set user data if available
          console.log("User data:", userData);
        } else {
          alert("Authentication failed: No token received.");
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="fixed z-50 w-full h-full bg-slate-900/60 items-center justify-center grid">
      <Form
        className="place-self-center w-[max(23vw,350px)] text-gray-400 bg-white flex flex-col gap-5 py-[25px] px-[30px] rounded-2xl text-sm animate-[fadeIn_0.5s_ease-in]"
        onSubmit={onSubmit}>
        <div className="flex justify-between items-center text-black">
          <h3 className="text-lg font-semibold text-gray-700">
            {currentState}
          </h3>
          <img
            src={assets.cross_icon}
            alt="cross icon"
            onClick={() => setShowLogin(false)}
            className="w-3 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              aria-label="Name"
              className="outline-none border rounded p-2"
              onChange={handleChange}
              value={data.name}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            aria-label="Email"
            className="outline-none border rounded p-2"
            onChange={handleChange}
            value={data.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            aria-label="Password"
            className="outline-none border rounded p-2"
            onChange={handleChange}
            value={data.password}
          />
          {currentState === "Sign Up" && (
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="outline-none border rounded p-2"
            />
          )}
        </div>
        <button className="p-2 rounded text-white bg-amber-600 cursor-pointer">
          {currentState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>
        <div className="flex items-start gap-2 -mt-3">
          <input
            type="checkbox"
            name="remember"
            className="outline-none border rounded p-2 mt-1 cursor-pointer"
            required
          />
          <p>
            By continuing, I agree to the Terms of Service and Privacy Policy
          </p>
        </div>
        <p>
          {currentState === "Sign Up" ? (
            <>
              Already have an account?
              <span
                onClick={() => setCurrentState("Sign In")}
                className="text-amber-600 font-semibold ml-2 cursor-pointer">
                Login here
              </span>
            </>
          ) : (
            <>
              Create an account?
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-amber-600 font-semibold ml-2 cursor-pointer">
                Click here
              </span>
            </>
          )}
        </p>
      </Form>
    </div>
  );
}
