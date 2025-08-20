import React from "react";

const ErrorCard = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">😟 Oops! Something went wrong</h1>
      <p className="text-gray-500">Don’t worry, we’re working on it and will be back shortly!</p>
    </div>
  );
};

export default ErrorCard;
