import React from "react";

const Popup = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div
        className={`${bgColor} p-5 rounded-lg shadow-lg text-white max-w-sm`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {type === "success" ? "Success" : "Error"}
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            &#x2715;
          </button>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
