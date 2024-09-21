// export default ProfileComponent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit2, User, Mail, FileText, Camera } from "lucide-react";
import FormInput from "../../Components/FormInput";
import Cookies from "js-cookie";
import Button from "../../Components/Button/Button";
import ProfileImageCircle from "../../Components/ProfileImageCircle";

const ProfileComponent = () => {
  const [userData, setUserData] = useState({
    full_name: "",
    role: "",
    user_name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!userData.full_name) newErrors.full_name = "Full name is required";
    if (!userData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(userData.email))
      newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const formData = new FormData();
      formData.append("full_name", userData.full_name);
      formData.append("user_name", userData.user_name);
      formData.append("email", userData.email);
      formData.append("bio", userData.bio);
      if (newProfilePicture) {
        formData.append("profilePicture", newProfilePicture);
      }

      const token = Cookies.get("token");
      await axios.put("http://localhost:3000/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setIsEditing(false);
      fetchUserData(); // Refresh user data after update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const getProfilePictureUrl = (profilePicture) => {
    if (!profilePicture) return "/api/placeholder/100/100";
    if (profilePicture.startsWith("http")) return profilePicture;
    return `http://localhost:3000${profilePicture}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="py-5 flex justify-between items-center border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Account Settings</h1>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className="w-8">
          <Edit2 className="mr-2 h-6 w-6 text-primaryIndigo" />
        </button>
      </div>
      <div className="">
        <div className="flex items-end my-6">
          <ProfileImageCircle
            fullName={userData.full_name}
            isEditing={isEditing}
            handleFileChange={handleFileChange}
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {userData.full_name}
            </h3>
            <p className="text-gray-600">{userData.role}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Full Name"
            name="full_name"
            value={userData.full_name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            disabled={!isEditing}
            error={errors.full_name}
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
          />
          <FormInput
            label="User_name"
            name="user_name"
            value={userData.user_name}
            onChange={handleInputChange}
            placeholder="Enter your user_name"
            disabled={!isEditing}
            error={errors.user_name}
            leftIcon={<User className="h-5 w-5 text-gray-400" />}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled={!isEditing}
            error={errors.email}
            leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
          />
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Bio
            </label>
            <div className="relative">
              <FileText className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your bio"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-indigo-500 block w-full pl-10 p-2 outline-none"
                rows="3"
              />
            </div>
          </div>
          {isEditing && (
            <Button
              extraSmall={true}
              type="submit"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </Button>
          )}
        </form>{" "}
      </div>
    </div>
  );
};

export default ProfileComponent;
