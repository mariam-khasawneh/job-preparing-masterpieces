// import React, { useState, useEffect } from "react";
// import FormInput from "../../Components/FormInput";
// import { User, Camera } from "lucide-react";

// const UserProfile = ({ user, onUpdateProfile }) => {
//   const [profile, setProfile] = useState({
//     full_name: "",
//     user_name: "",
//     email: "",
//     bio: "",
//     profilePicture: "",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (user) {
//       setProfile({
//         full_name: user.full_name || "",
//         user_name: user.user_name || "",
//         email: user.email || "",
//         bio: user.bio || "",
//         profilePicture: user.profilePicture || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically validate the form and call the onUpdateProfile function
//     // For this example, we'll just log the profile data
//     console.log("Updated profile:", profile);
//     if (onUpdateProfile) {
//       onUpdateProfile(profile);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex items-center space-x-4 mb-4">
//           <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
//             {profile.profilePicture ? (
//               <img
//                 src={profile.profilePicture}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <User size={48} className="text-gray-400" />
//               </div>
//             )}
//           </div>
//           <button
//             type="button"
//             className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             <Camera size={20} className="mr-2" />
//             Change Photo
//           </button>
//         </div>

//         <FormInput
//           label="Full Name"
//           name="full_name"
//           type="text"
//           placeholder="Enter your full name"
//           value={profile.full_name}
//           onChange={handleChange}
//           error={errors.full_name}
//         />

//         <FormInput
//           label="User_name"
//           name="user_name"
//           type="text"
//           placeholder="Enter your user_name"
//           value={profile.user_name}
//           onChange={handleChange}
//           error={errors.user_name}
//         />

//         <FormInput
//           label="Email"
//           name="email"
//           type="email"
//           placeholder="Enter your email"
//           value={profile.email}
//           onChange={handleChange}
//           error={errors.email}
//         />

//         <FormInput
//           label="Bio"
//           name="bio"
//           type="textarea"
//           placeholder="Tell us about yourself"
//           value={profile.bio}
//           onChange={handleChange}
//           error={errors.bio}
//         />

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit2, User, Mail, FileText } from "lucide-react";
import FormInput from "../../Components/FormInput"; // Ensure this path is correct
import Cookies from "js-cookie";
import Button from "../../Components/Button/Button";

const ProfileComponent = () => {
  const [userData, setUserData] = useState({
    full_name: "",
    role: "",
    user_name: "",
    email: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Debugging: Check all cookies
      console.log("Cookies:", document.cookie);

      // Retrieve the token from cookies
      const token = Cookies.get("token");
      console.log("Retrieved token:", token);

      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in headers
          },
          withCredentials: true, // Include credentials if using cookies
        }
      );
      console.log(response.data);
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
      await axios.put("http://localhost:3000/api/users/profile", userData, {
        withCredentials: true, // Include credentials (cookies) with the request
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className=" py-5 flex justify-between items-center border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Account Settings</h1>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className="w-8">
          <Edit2 className="mr-2 h-6 w-6 text-primaryIndigo" />
        </button>
      </div>
      <div className="">
        <div className="flex items-center mb-6">
          <img
            src={userData.profilePicture || "/api/placeholder/100/100"}
            alt="Profile"
            className="rounded-full w-24 h-24 mr-4"
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
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
