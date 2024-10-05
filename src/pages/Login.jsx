import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend for login
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      
      // Handle successful login (e.g., store token in localStorage or context)
      localStorage.setItem("token", response.data.accessToken);
      alert("Login successful!");
      
      // Redirect to a protected page (e.g., dashboard)
      navigate('/home'); 
    } catch (error) {
      // Handle error during login
      console.error(error);
      alert(error.response?.data?.error || "Login failed.");
    }
  };
  return (
    <div className="">
       <div className="flex justify-center items-center font-bold bg-green-300 h-12  text-[20px]  px-8">
      <div className="password-manager cursor-pointer ">
        <h2>Password Manager</h2>
      </div>
    </div>
    
      <div className="bg-green-200 flex justify-center rounded-xl mt-[90px] m-auto  items-center border-solid w-[40%] relative  h-[400px] border-black">
        <h2 className="absolute  top-[20px] left-[33px] text-3xl ">Login</h2>
        <h1 className="absolute text-green-700 top-[20px] bg-green-200 left-[50%] px-2 text-3xl font-bold">
          Password Manager
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" flex flex-col gap-1 justify-center items-center">
            <label className="block font-bold text-xl mr-auto">Email : </label>
            <input
              type="Email"
              name="Email"
              value={formData.Email}
              placeholder="Email"
              onChange={handleChange}
              className=" rounded-md border-solid w-[266px] px-2 "
            />
          </div>

          <div className=" flex flex-col gap-1 justify-center items-center">
            <label className="block font-bold text-xl mr-auto">
              Password :
            </label>
            <input
              type="text"
              name="Password"
              value={formData.Password}
              placeholder="Password"
              onChange={handleChange}
              className=" rounded-md border-solid w-[266px] px-2 "
            />
          </div>
          <div className="flex mt-9 ">
            <button className="bg-green-800 w-[330px] rounded-2xl flex justify-center items-center hover:bg-green-700 text-white p-1  mt-4 ml-auto">
              LogIn
            </button>
          </div>
          <p className="flex justify-center items-center font-semibold">
            Don't have an account? &nbsp;{" "}
            <a className="font-thin text-blue-500" href="">
              <Link to="/signup">SignUp</Link>{" "}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
