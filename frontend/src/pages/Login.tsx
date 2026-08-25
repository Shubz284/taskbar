import { LogIn, UserLock } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const fieldName = name as keyof FormData;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // For preventing page Reload

    //Validate first

    if (!validateForm()) {
      return; // stop if Validation fails
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Logged in");
        // Reset form
        setFormData({ email: "", password: "" });
        navigate("/dashboard");
      } else {
        // Show error from backend
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      toast.error(`${error}`);
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <section className="auth-welcome">
        <div className="auth-mark">
          T<span>V</span>
        </div>
        <div className="auth-welcome-copy">
          <p className="auth-eyebrow">A calmer way to get things done</p>
          <h1>
            Welcome to
            <br />
            <em>Taskverse</em>
          </h1>
          <p className="auth-description">
            Make space for the work that matters. Keep every idea, deadline, and
            small win moving forward.
          </p>
        </div>
        <p className="auth-note">Plan lightly. Finish proudly.</p>
      </section>
      <div className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <p className="auth-eyebrow">Your workspace awaits</p>
            <h2>Welcome back</h2>
            <p>Sign in to pick up where you left off.</p>
          </div>
          <div className="auth-switcher">
            <div className="flex gap-3">
              <div
                className="flex items-center p-0.5 gap-0.5 bg-gray-100 text-gray-700 rounded-sm cursor-pointer shadow-md hover:text-black "
                onClick={() => navigate("/login")}
              >
                <LogIn size={15} />
                Login
              </div>
              <div
                className="flex items-center p-0.5 gap-0.5 bg-gray-100 text-gray-700 border-2 border-solid rounded-sm cursor-pointer shadow-md hover:text-black "
                onClick={() => navigate("/")}
              >
                <UserLock size={15} />
                Sign up
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">
                Email address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="bg-white  border-2 text-gray-500 rounded-lg p-2 w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="w-full">
              <div className="flex justify-between">
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>
                <h3 className="underline cursor-pointer">Forgot Password?</h3>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-white border-2 text-gray-500 rounded-lg p-2 w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mt-2 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer p-2 text-md bg-[#22252d] text-white rounded-sm w-full"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
          <div className="mt-2 flex gap-1">
            Don't have account yet?{" "}
            <h3
              className="underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              create one
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
