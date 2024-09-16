import React, { useState, useEffect } from "react";
import FormInput from "../../Components/FormInput";
import { User, Camera } from "lucide-react";

const UserProfile = ({ user, onUpdateProfile }) => {
  const [profile, setProfile] = useState({
    full_name: "",
    user_name: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.full_name || "",
        user_name: user.user_name || "",
        email: user.email || "",
        bio: user.bio || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate the form and call the onUpdateProfile function
    // For this example, we'll just log the profile data
    console.log("Updated profile:", profile);
    if (onUpdateProfile) {
      onUpdateProfile(profile);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Camera size={20} className="mr-2" />
            Change Photo
          </button>
        </div>

        <FormInput
          label="Full Name"
          name="full_name"
          type="text"
          placeholder="Enter your full name"
          value={profile.full_name}
          onChange={handleChange}
          error={errors.full_name}
        />

        <FormInput
          label="Username"
          name="user_name"
          type="text"
          placeholder="Enter your username"
          value={profile.user_name}
          onChange={handleChange}
          error={errors.user_name}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={profile.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          label="Bio"
          name="bio"
          type="textarea"
          placeholder="Tell us about yourself"
          value={profile.bio}
          onChange={handleChange}
          error={errors.bio}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
