import React from "react";

const FormInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  leftIcon,
  rightIcon,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`bg-gray-50 border ${
            error ? "border-red-600" : "border-gray-300"
          }  text-gray-900 text-md rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-indigo-500 block w-full ${
            leftIcon && "pl-10"
          } p-2 outline-none `}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
