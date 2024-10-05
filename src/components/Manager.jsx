import React, { useEffect, useState } from "react";
import ShowPasswords from "./ShowPasswords";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "./Header";

const Manager = () => {
  const notifyWarning = () => toast.warning("Please Fill The Form Full!");
  const notifySuccess = () => toast.success("Password Saved Successfully!");
  const notifyDelete = () => toast.info("Password deleted Successfully!");
  const notifyError = (message) => toast.error(message);

  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [password, setPassword] = useState("");
  const [StoredPassword, setStoredPassword] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("Token not found");
        notifyError("Authorization token not found. Please login again.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/passwords", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStoredPassword(response.data);
      } catch (error) {
        console.error("Error fetching passwords", error);
        notifyError("Error fetching passwords");
      }
    };
    fetchPasswords();
  }, []);

  const DeletePassword = async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Token not found');
      notifyError("Authorization token not found. Please login again.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/passwords/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatePasswords = StoredPassword.filter(
        (password) => password._id !== id
      );
      setStoredPassword(updatePasswords);
      notifyDelete();
    } catch (error) {
      console.error("Error deleting password", error);
      notifyError("Error deleting password");
    }
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Token not found');
      notifyError("Authorization token not found. Please login again.");
      return;
    }

    if (
      websiteName.length <= 2 ||
      websiteUrl.length <= 4 ||
      password.length <= 4
    ) {
      notifyWarning();
      return;
    }

    const newPassword = { websiteName, websiteUrl, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/passwords",
        newPassword,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setStoredPassword([...StoredPassword, response.data]);
      notifySuccess();

      // Reset form
      setWebsiteName("");
      setWebsiteUrl("");
      setPassword("");
    } catch (error) {
      console.error("Error saving password:", error);
      notifyError("Error saving password");
    }
  };

  return (
    <div className="">
      <Header/>
      <div className="flex text-green-600 flex-col items-center justify-center p-4">
        <h1 className="font-bold text-3xl">Password Manager</h1>
        <p className="text-2xl">Your own Password Manager</p>
      </div>

      <div className="mt-3 flex justify-center rounded-lg  items-center m-auto h-[245px] w-[40%] bg-green-500 ">
        <form className="space-y-4" onSubmit={formSubmit}>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col">
              <label className="block font-bold mb-1">Website Name</label>
              <input
                type="text"
                value={websiteName}
                className="p-2 border border-gray-300 rounded"
                placeholder="e.g., Google"
                required
                onChange={(e) => setWebsiteName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block font-bold mb-1">Website URL</label>
              <input
                type="text"
                value={websiteUrl}
                className="p-2 border border-gray-300 rounded"
                placeholder="e.g., https://google.com"
                required
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block font-bold mb-1">Password</label>
            <input
              type="password"
              value={password}
              className="p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-800 hover:bg-green-700 text-white p-2 rounded mt-4"
          >
            Add Password
          </button>
        </form>
      </div>
      <ShowPasswords
        Passwords={StoredPassword}
        DeletePassword={DeletePassword}
      />
      <ToastContainer />
    </div>
  );
};

export default Manager;
