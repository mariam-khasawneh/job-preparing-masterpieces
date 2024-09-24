import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../../Components/FormInput";
import { BookOpen } from "lucide-react";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { storage } from "../../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { checkAuthState } from "../../Store/Slices/authSlice";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
// import ProgressBar from "react-progressbar.js";
// import Circle from "react-progressbar.js/lib/circle";

const CoachRequestForm = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    experience: "",
    educationalBackground: [
      { university: "", credential: "", major: "", period: "" },
    ],
  });
  const [user, setUser] = useState({
    _id: " ",
  });
  const [cvFile, setCvFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [errors, setErrors] = useState({});

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
      setUser(response.data.user);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  // Add this useEffect to log authentication state changes
  useEffect(() => {
    console.log("Auth state:", { isLoggedIn, user: user?.id, token });
  }, [isLoggedIn, user, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    console.log(`Selected ${fileType}:`, file);
    if (fileType === "cv") {
      setCvFile(file);
    } else if (fileType === "video") {
      setVideoFile(file);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.educationalBackground];
    newEducation[index][field] = value;
    setFormData({ ...formData, educationalBackground: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      educationalBackground: [
        ...formData.educationalBackground,
        { university: "", credential: "", major: "", period: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...formData.educationalBackground];
    newEducation.splice(index, 1);
    setFormData({ ...formData, educationalBackground: newEducation });
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    console.log(`Uploading file to: ${path}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    console.log(`File uploaded. Download URL: ${downloadUrl}`);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setErrors({ submit: "User is not authenticated. Please log in." });
      return;
    }

    // Basic validation
    const newErrors = {};
    if (!cvFile) newErrors.cv = "CV is required";
    if (!videoFile) newErrors.video = "Introductory video is required";
    if (!formData.experience) newErrors.experience = "Experience is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Upload files to Firebase Storage
      const cvUrl = await uploadFile(cvFile, `${user._id}/cv/${cvFile.name}`);
      const videoUrl = await uploadFile(
        videoFile,
        `${user._id}/video/${videoFile.name}`
      );

      // Prepare data to send to your API
      const dataToSend = {
        userId: user._id,
        cv: cvUrl,
        introductoryVideo: videoUrl,
        experience: formData.experience,
        educationalBackground: formData.educationalBackground,
      };

      // Send data to your API
      const response = await axios.post(
        "http://localhost:3000/api/coach-request/new",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Request submitted successfully:", response.data);
        toast.success("Your coach request has been submitted successfully.");
        // Handle success (e.g., show a success message, redirect)
      } else {
        setErrors({ submit: response.data.error });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrors({ submit: "Failed to submit request. Please try again." });
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Coach Request Form</h1>
        <p className="text-red-500">Please log in to submit a coach request.</p>
        {/* Add a login button or link to your login page here */}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="py-5 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-2">Coach Request Form</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Upload CV (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "cv")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
          {errors.cv && <p className="text-red-500">{errors.cv}</p>}
        </div>

        <div>
          <label className="block mb-2">Upload Introductory Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "video")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
          {errors.video && <p className="text-red-500">{errors.video}</p>}
        </div>

        <div>
          <FormInput
            label="Experience"
            name="experience"
            type="textarea"
            placeholder="Describe your coaching experience"
            value={formData.experience}
            onChange={handleInputChange}
            error={errors.experience}
            leftIcon={<BookOpen size={20} />}
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Educational Background</h3>
          {formData.educationalBackground.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <FormInput
                label="University"
                value={edu.university}
                onChange={(e) =>
                  handleEducationChange(index, "university", e.target.value)
                }
              />
              <FormInput
                label="Credential"
                value={edu.credential}
                onChange={(e) =>
                  handleEducationChange(index, "credential", e.target.value)
                }
              />
              <FormInput
                label="Major"
                value={edu.major}
                onChange={(e) =>
                  handleEducationChange(index, "major", e.target.value)
                }
              />
              <FormInput
                label="Period"
                value={edu.period}
                onChange={(e) =>
                  handleEducationChange(index, "period", e.target.value)
                }
              />
              {index > 0 && (
                <Button
                  secondary={true}
                  extraSmall={true}
                  onClick={() => removeEducation(index)}
                  variant="danger"
                  className="mt-2"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            primaryOutlined={true}
            extraSmall={true}
            onClick={addEducation}
            variant="secondary"
            className="mt-2"
          >
            Add Education
          </Button>
        </div>

        <Button
          primary={true}
          extraSmall={true}
          type="submit"
          className="w-full"
        >
          Submit Request
        </Button>

        {errors.submit && <p className="text-red-500">{errors.submit}</p>}
      </form>
    </div>
  );
};

export default CoachRequestForm;
