// import React, { useState } from "react";

// const FormInput = ({
//   label,
//   type,
//   placeholder,
//   required = false,
//   onChange,
//   value,
//   validator = () => {},
//   name,
//   error,
//   resetError,
//   leftIcon,
//   rightIcon,
// }) => {
//   const [isValid, setIsValid] = useState(true);

//   const handleInputChange = (event) => {
//     const inputValue = event.target.value;

//     const response = validator(inputValue);

//     setIsValid(response); // Update the validity state
//     onChange(inputValue); // Pass the input value to
//   };

//   return (
//     <div>
//       <label className="block mb-2 text-sm font-medium text-slate-600">
//         {label}
//       </label>
//       <div className="relative">
//         {leftIcon && (
//           <div className="absolute inset-y-0 letf-0 flex items-center pl-3 pointer-events-none">
//             {leftIcon}
//           </div>
//         )}
//         <input
//           onFocus={resetError}
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={handleInputChange}
//           required={required}
//           className={`bg-gray-50 border ${
//             error ? "border-red-600" : "border-gray-300"
//           }  text-gray-900 text-md rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-indigo-500 block
//           w-full ${leftIcon && "pl-10"} p-2.5 outline-none `}
//         />
//         {rightIcon && (
//           <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
//             {rightIcon}
//           </div>
//         )}
//       </div>
//       {!isValid?.isValid && error === null && (
//         <span className="mt-2 text-sm text-red-600">{isValid?.msg}</span>
//       )}
//       {error && <span className="mt-2 text-sm text-red-600">{error}</span>}
//     </div>
//   );
// };

// export default FormInput;
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
          // className={`w-full py-2 px-4 ${leftIcon ? "pl-10" : ""} ${
          //   rightIcon ? "pr-10" : ""
          // } border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryIndigo focus:border-transparent ${
          //   error ? "border-red-500" : ""
          // }`}
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
