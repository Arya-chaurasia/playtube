import React from "react";

const SignInButton = () => {
  return (
    <button className="flex items-center gap-2 px-4 py-1 border border-blue-600 rounded-full text-blue-600 font-medium hover:bg-blue-50 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        viewBox="0 -960 960 960"
        width="20"
        fill="#2563eb"
      >
        <path d="M479.825-80Q400-80 334.5-117.5t-103.5-99Q186-272 153-336.5T120-480q0-82 33-154.5T227-788q47-47 111-79.5T493-900q89 0 165 41.5T788-748l-58 56q-54-54-117-82t-120-28q-67 0-125 25.5T268-688q-44 44-66 101t-22 107q0 59 22.5 115.5T268-249q44 44 102.5 66.5T480-160q59 0 117-22.5T700-249v-91H560v-80h240v240h-80v-96q-54 54-118 80t-122 26Z" />
      </svg>
      Sign in
    </button>
  );
};

export default SignInButton;
