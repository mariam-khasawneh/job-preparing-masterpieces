import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusIcon, Trash2Icon, BookOpen } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/firebase";
import { checkAuthState } from "../../Store/Slices/authSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";

const CoachRequestForm = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "",
    educationalBackground: [
      {
        university: "",
        credential: "",
        major: "",
        // period: "",
        startDate: "",
        endDate: "",
      },
    ],
  });
  const [user, setUser] = useState({ _id: "" });
  const [cvFile, setCvFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetchUserData();
    dispatch(checkAuthState());
  }, [dispatch]);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found in cookies");

      const response = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === "cv") setCvFile(file);
    else if (fileType === "video") setVideoFile(file);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = formData.educationalBackground.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setFormData((prev) => ({
      ...prev,
      educationalBackground: newEducation,
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educationalBackground: [
        ...prev.educationalBackground,
        {
          university: "",
          credential: "",
          major: "",
          // period: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      educationalBackground: prev.educationalBackground.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("User is not authenticated. Please log in.");
      return;
    }

    if (!cvFile || !videoFile || !formData.experience) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const updateToast = toast.loading("Submitting your request...");

    try {
      const cvUrl = await uploadFile(cvFile, `${user._id}/cv/${cvFile.name}`);
      const videoUrl = await uploadFile(
        videoFile,
        `${user._id}/video/${videoFile.name}`
      );

      const dataToSend = {
        userId: user._id,
        cv: cvUrl,
        introductoryVideo: videoUrl,
        experience: formData.experience,
        educationalBackground: formData.educationalBackground,
      };

      const response = await axios.post(
        "http://localhost:3000/api/coach-request/new",
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Your coach request has been submitted successfully.", {
          id: updateToast,
        });
      } else {
        throw new Error(response.data.error || "Failed to submit request");
      }
    } catch (error) {
      toast.error(`Submission failed: ${error.message}`, { id: updateToast });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Experience</h3>
        </CardHeader>
        <CardContent>
          <Textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Describe your coaching experience"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Educational Background</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.educationalBackground.map((edu, index) => (
            <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <Input
                placeholder="University"
                value={edu.university}
                onChange={(e) =>
                  handleEducationChange(index, "university", e.target.value)
                }
              />
              <Input
                placeholder="Credential"
                value={edu.credential}
                onChange={(e) =>
                  handleEducationChange(index, "credential", e.target.value)
                }
              />
              <Input
                placeholder="Major"
                value={edu.major}
                onChange={(e) =>
                  handleEducationChange(index, "major", e.target.value)
                }
              />
              {/* <Input
                placeholder="Period"
                value={edu.period}
                onChange={(e) =>
                  handleEducationChange(index, "period", e.target.value)
                }
              /> */}
              <div className="flex gap-2">
                <Input
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                />
                <Input
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, "endDate", e.target.value)
                  }
                />
              </div>
              {index > 0 && (
                <Button
                  onClick={() => removeEducation(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2Icon className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={addEducation} variant="outline">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Upload CV (PDF)</h3>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "cv")}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Upload Introductory Video</h3>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "video")}
          />
        </CardContent>
      </Card>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Coach Request Form</h1>
        <p className="text-red-500">Please log in to submit a coach request.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>JobReady | Coach Request Form</title>
      </Helmet>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Coach Request Form</h2>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}

        <div className="flex justify-between mt-6 gap-2">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} variant="outline">
              Back
            </Button>
          )}

          {step < 2 && <Button onClick={() => setStep(step + 1)}>Next</Button>}

          {step === 2 && <Button onClick={handleSubmit}>Submit Request</Button>}
        </div>
      </div>
    </>
  );
};

export default CoachRequestForm;
