import React, { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useGetCoachProfile from "../../Hooks/useGetCoachProfile";
import usePatchCoachProfile from "../../Hooks/usePatchCoachProfile";
import SkillsInput from "./SkillsInput";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";

const CoachProfileSettings = () => {
  const {
    loading: fetching,
    data: coachProfile,
    error: fetchError,
  } = useGetCoachProfile();
  const { patchProfile, isUpdating, updateError } = usePatchCoachProfile();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "",
    educationalBackground: [
      {
        university: "",
        credential: "",
        major: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [],
    about: "",
    linkedIn: "",
  });

  useEffect(() => {
    if (coachProfile) {
      setFormData({
        experience: coachProfile.experience || "",
        educationalBackground:
          coachProfile.educationalBackground.length > 0
            ? coachProfile.educationalBackground
            : [
                {
                  university: "",
                  credential: "",
                  major: "",
                  startDate: "",
                  endDate: "",
                },
              ],
        skills: coachProfile.skills || [],
        about: coachProfile.about || "",
        linkedIn: coachProfile.linkedIn || "",
      });
    }
  }, [coachProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addEducation = () => {
    setFormData((prevState) => ({
      ...prevState,
      educationalBackground: [
        ...prevState.educationalBackground,
        {
          university: "",
          credential: "",
          major: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = formData.educationalBackground.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setFormData((prevState) => ({
      ...prevState,
      educationalBackground: newEducation,
    }));
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, skill],
      }));
    }
  };

  const removeSkill = (skill) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((s) => s !== skill),
    }));
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
              <div className="flex gap-2">
                <Input
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                />{" "}
                <Input
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, "endDate", e.target.value)
                  }
                />
              </div>
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
      <SkillsInput
        skills={formData.skills}
        addSkill={addSkill}
        removeSkill={removeSkill}
      />
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">LinkedIn Profile</h3>
        </CardHeader>
        <CardContent>
          <Input
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleInputChange}
            placeholder="LinkedIn URL"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">About</h3>
        </CardHeader>
        <CardContent>
          <Textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
          />
        </CardContent>
      </Card>
    </div>
  );

  const handleSubmit = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    const updateToast = toast.loading("Updating profile...");

    try {
      const result = await patchProfile(formData);
      if (result) {
        toast.success("Profile updated successfully", { id: updateToast });
      } else {
        toast.error("Failed to update profile", { id: updateToast });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: updateToast });
    }
  };

  return (
    <>
      <Helmet>
        <title>Coach Profile Settings</title>
      </Helmet>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {fetching ? (
          <p>Loading...</p>
        ) : fetchError ? (
          <p>Error: {fetchError.message}</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Coach Profile Settings</h2>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}

            <div className="flex justify-between mt-6 gap-2">
              {step > 1 && (
                <Button onClick={() => setStep(step - 1)} variant="outline">
                  Back
                </Button>
              )}

              {step < 2 && (
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              )}

              {step === 2 && (
                <Button onClick={handleSubmit} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Profile"}
                </Button>
              )}
            </div>
            {updateError && (
              <p className="text-red-500">Error: {updateError.message}</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CoachProfileSettings;
