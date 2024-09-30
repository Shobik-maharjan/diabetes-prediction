import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg max-w-xl min-w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-red-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
