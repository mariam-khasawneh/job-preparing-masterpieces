import React, { useState } from "react";
import { Edit2, User, Mail, FileText, Camera } from "lucide-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Cookies from "js-cookie";
import useGetUserProfile from "../../Hooks/useGetUserProfile";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { toast } from "react-hot-toast";

const ProfileComponent = () => {
  const { userData, setUserData, isLoading, error, fetchUserData } =
    useGetUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateToast = toast.loading("Updating profile...");

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
      fetchUserData();
      toast.success("Profile updated successfully", { id: updateToast });
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile", { id: updateToast });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>JobReady | User Account Settings</title>
      </Helmet>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Account Settings</h2>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            size="icon"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={userData.profilePicture}
                  alt={userData.full_name}
                />
                <AvatarFallback>{userData.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{userData.full_name}</h3>
                <p className="text-sm text-gray-500">{userData.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    name="full_name"
                    value={userData.full_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    name="user_name"
                    value={userData.user_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-500" />
                  <Textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10 min-h-[100px]"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Picture</label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          {isEditing && (
            <CardFooter>
              <Button onClick={handleSubmit}>Save Changes</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
};

export default ProfileComponent;
