import React from "react";
import { Camera } from "lucide-react";

const ProfileImageCircle = ({ fullName, isEditing, handleFileChange }) => {
  const getInitial = (name) => name.charAt(0).toUpperCase();
  const getRandomColor = () => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="relative">
      <div
        className={`rounded-2xl w-24 h-24 mr-4 flex items-center justify-center text-white text-3xl font-bold bg-indigo-300`}
      >
        {getInitial(fullName)}
      </div>
      {isEditing && (
        <label
          htmlFor="profile-picture-input"
          className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
        >
          <Camera className="h-5 w-5 text-gray-600" />
          <input
            id="profile-picture-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ProfileImageCircle;
