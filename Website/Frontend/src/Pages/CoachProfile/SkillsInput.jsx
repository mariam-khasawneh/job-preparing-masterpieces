import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";

// Predefined skills list
const predefinedSkills = [
  "Active Listening",
  "Adaptability",
  "Assessment",
  " Analytical Skills",
  "Business",
  "Conflict Resolution",
  "Communication",
  "Emotional Intelligence",
  "Goal Setting",
  "Leadership",
  "Motivation",
  "Networking",
  "Problem Solving",
  "Resume writing",
  "Strategic Planning",
  "Time Management",
  "Team Building",
];

const SkillsInput = ({ skills, addSkill, removeSkill }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue.length > 0) {
      const matchedSkills = predefinedSkills.filter((skill) =>
        skill.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(matchedSkills);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      addSkill(inputValue.trim());
      setInputValue("");
    }
  };

  const handleSuggestionClick = (skill) => {
    addSkill(skill);
    setInputValue("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Skills</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                onClick={() => removeSkill(skill)}
                key={index}
                className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1.5 rounded-full  items-center border border-1 border-primaryIndigo cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a skill"
              />
              <Button onClick={handleAddSkill} variant="secondary">
                Add
              </Button>
            </div>
            {suggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-md shadow-sm">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SkillsInput;
