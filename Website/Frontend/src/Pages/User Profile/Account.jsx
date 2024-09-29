import React, { useState } from "react";
import { Edit2, User, Mail, FileText, Camera } from "lucide-react";
import { Helmet } from "react-helmet-async";
import useGetUserProfile from "../../Hooks/useGetUserProfile";
import usePatchUserProfile from "../../Hooks/usePatchUserProfile"; // Import the custom hook
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/firebase";

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

const ProfileComponent = () => {
  const {
    userData,
    setUserData,
    isLoading: isUserLoading,
    error: userError,
    fetchUserData,
  } = useGetUserProfile();
  const {
    patchUserProfile,
    isLoading: isPatchLoading,
    error: patchError,
  } = usePatchUserProfile(); // Use the custom hook

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const uploadProfilePicture = async (file) => {
    const storageRef = ref(
      storage,
      `profile_pictures/${userData._id}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedUserData = { ...userData };

    if (newProfilePicture) {
      try {
        const profilePictureUrl = await uploadProfilePicture(newProfilePicture);
        updatedUserData.profilePicture = profilePictureUrl;
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        // You might want to show a toast notification here
      }
    }

    patchUserProfile(updatedUserData, null, fetchUserData);
    setIsEditing(false);
  };

  if (isUserLoading || isPatchLoading) {
    return <div>Loading...</div>;
  }

  if (userError || patchError) {
    return <div>Error: {userError || patchError}</div>;
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
