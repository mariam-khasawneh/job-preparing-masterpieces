import React, { useState } from "react";
import FormInput from "../../Components/FormInput";
import { Upload, BookOpen, Video } from "lucide-react";
import Button from "../../Components/Button/Button";

const CoachRequestForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    experience: "",
    educationalBackground: [
      { university: "", credential: "", major: "", period: "" },
    ],
  });
  const [cvFile, setCvFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "cv") {
      setCvFile(files[0]);
    } else if (name === "video") {
      setVideoFile(files[0]);
    }
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...formData.educationalBackground];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      educationalBackground: newEducation,
    }));
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      educationalBackground: [
        ...prevData.educationalBackground,
        { university: "", credential: "", major: "", period: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const formDataToSend = new FormData();
      formDataToSend.append("userId", userId);
      formDataToSend.append("cv", cvFile);
      formDataToSend.append("video", videoFile);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append(
        "educationalBackground",
        JSON.stringify(formData.educationalBackground)
      );

      const response = await fetch(
        "http://localhost:3000/api/coach-request/new",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const result = await response.json();
      console.log("Request submitted successfully:", result);
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrors({ submit: "Failed to submit request. Please try again." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className=" py-5  flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-2">Coach Request Form</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            CV Upload (PDF only)
          </label>
          <input
            type="file"
            name="cv"
            accept=".pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-600
                      hover:file:bg-indigo-100"
          />
          {errors.cv && (
            <p className="mt-1 text-sm text-red-500">{errors.cv}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Introductory Video Upload (MP4 only)
          </label>
          <input
            type="file"
            name="video"
            accept="video/mp4"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-600
                      hover:file:bg-indigo-100"
          />
          {errors.video && (
            <p className="mt-1 text-sm text-red-500">{errors.video}</p>
          )}
        </div>

        <FormInput
          label="Experience"
          name="experience"
          type="textarea"
          placeholder="Describe your coaching experience"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          leftIcon={<BookOpen size={20} />}
        />

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Educational Background</h2>
          {formData.educationalBackground.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <FormInput
                label="University"
                name="university"
                type="text"
                placeholder="Enter university name"
                value={edu.university}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education${index}University`]}
              />
              <FormInput
                label="Credential"
                name="credential"
                type="text"
                placeholder="Enter credential"
                value={edu.credential}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education${index}Credential`]}
              />
              <FormInput
                label="Major"
                name="major"
                type="text"
                placeholder="Enter major"
                value={edu.major}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education${index}Major`]}
              />
              <FormInput
                label="Period"
                name="period"
                type="text"
                placeholder="Enter study period (e.g., 2010-2014)"
                value={edu.period}
                onChange={(e) => handleEducationChange(index, e)}
                error={errors[`education${index}Period`]}
              />
            </div>
          ))}
          <Button extraSmall secondary type="button" onClick={addEducation}>
            Add Education
          </Button>
        </div>

        {errors.submit && <p className="text-red-500">{errors.submit}</p>}
        <Button type="submit" extraSmall primary>
          Submit Coach Request
        </Button>
      </form>
    </div>
  );
};

export default CoachRequestForm;
// import React, { useState } from "react";
// import FormInput from "../../Components/FormInput"; // Assuming FormInput is in the same directory
// import { Upload, BookOpen, Video } from "lucide-react";
// import Button from "../../Components/Button/Button";

// const CoachRequestForm = ({ userId }) => {
//   const [formData, setFormData] = useState({
//     cv: "",
//     experience: "",
//     introductoryVideo: "",
//     educationalBackground: [
//       { university: "", credential: "", major: "", period: "" },
//     ],
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleEducationChange = (index, e) => {
//     const { name, value } = e.target;
//     const newEducation = [...formData.educationalBackground];
//     newEducation[index] = { ...newEducation[index], [name]: value };
//     setFormData((prevData) => ({
//       ...prevData,
//       educationalBackground: newEducation,
//     }));
//   };

//   const addEducation = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       educationalBackground: [
//         ...prevData.educationalBackground,
//         { university: "", credential: "", major: "", period: "" },
//       ],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Basic validation
//     const newErrors = {};
//     if (!formData.cv) newErrors.cv = "CV is required";
//     if (!formData.experience) newErrors.experience = "Experience is required";
//     if (!formData.introductoryVideo)
//       newErrors.introductoryVideo = "Introductory video is required";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/coach-request/new",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId,
//             ...formData,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit request");
//       }

//       const result = await response.json();
//       console.log("Request submitted successfully:", result);
//       // Handle success (e.g., show a success message, redirect)
//     } catch (error) {
//       console.error("Error submitting request:", error);
//       setErrors({ submit: "Failed to submit request. Please try again." });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Coach Request Form</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <FormInput
//           label="CV Upload"
//           name="cv"
//           type="text"
//           placeholder="Enter CV file URL"
//           value={formData.cv}
//           onChange={handleChange}
//           error={errors.cv}
//           leftIcon={<Upload size={20} />}
//         />

//         <FormInput
//           label="Experience"
//           name="experience"
//           type="textarea"
//           placeholder="Describe your coaching experience"
//           value={formData.experience}
//           onChange={handleChange}
//           error={errors.experience}
//           leftIcon={<BookOpen className="text-slate-400" size={14} />}
//         />

//         <FormInput
//           label="Introductory Video"
//           name="introductoryVideo"
//           type="text"
//           placeholder="Enter video URL"
//           value={formData.introductoryVideo}
//           onChange={handleChange}
//           error={errors.introductoryVideo}
//           leftIcon={<Video className="text-slate-400" size={14} />}
//         />

//         <div className="mb-4">
//           <h2 className="text-lg font-semibold mb-2">Educational Background</h2>
//           {formData.educationalBackground.map((edu, index) => (
//             <div key={index} className="mb-4 p-4 border rounded">
//               <FormInput
//                 label="University"
//                 name="university"
//                 type="text"
//                 placeholder="Enter university name"
//                 value={edu.university}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education${index}University`]}
//               />
//               <FormInput
//                 label="Credential"
//                 name="credential"
//                 type="text"
//                 placeholder="Enter credential"
//                 value={edu.credential}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education${index}Credential`]}
//               />
//               <FormInput
//                 label="Major"
//                 name="major"
//                 type="text"
//                 placeholder="Enter major"
//                 value={edu.major}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education${index}Major`]}
//               />
//               <FormInput
//                 label="Period"
//                 name="period"
//                 type="text"
//                 placeholder="Enter study period (e.g., 2010-2014)"
//                 value={edu.period}
//                 onChange={(e) => handleEducationChange(index, e)}
//                 error={errors[`education${index}Period`]}
//               />
//             </div>
//           ))}
//           <Button extraSmall secondary type="button" onClick={addEducation}>
//             Add Education
//           </Button>
//         </div>

//         {errors.submit && <p className="text-red-500">{errors.submit}</p>}

//         <Button type="submit" extraSmall primary>
//           Submit Coach Request
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default CoachRequestForm;
