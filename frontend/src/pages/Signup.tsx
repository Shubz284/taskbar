import { LogIn, UserLock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Toaster, toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const Signup = () => {

  const [formData, setFormData] = useState<FormData>({
        name:'',
        email:'',
        password:''
      })
  
      const [errors, setErrors] = useState<FormErrors>({
        name:'',
        email: '',
        password: '',
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

      if (!formData.name.trim()) {
        newErrors.name = " Name is Required";
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

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
              `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              }
            );
    
            if (response.ok) {
              // Reset form
              setFormData({ name:"", email: "", password: "" });
              toast.success("Signed up successfully!");
              navigate('/login');
            }
          } catch (error) {
            toast.error(`${error}`)
            console.error("Error:", error);
          } finally {
            setIsSubmitting(false);
          }
        };

    const navigate = useNavigate();
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-300 ">
        <div className="flex items-center flex-col gap-4 p-5 w-82 font-medium text-sm bg-white rounded-lg  ">
          <div className="flex gap-3">
            <div
              className="flex items-center p-0.5 gap-0.5 bg-gray-100 text-gray-700 rounded-sm cursor-pointer shadow-md hover:text-black"
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
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="bg-white  border-2  text-gray-500 rounded-lg p-2 w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
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
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>
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
                {isSubmitting ? "Signing up..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="mt-2 flex gap-1">
            Already have an account
            <h3
              className="underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here
            </h3>
          </div>
        </div>
        <Toaster
          className="py-3 h-25"
          style={{ padding: "10px", borderRadius: "0px", height: "100px" }}
        />
      </div>
  );
}

export default Signup