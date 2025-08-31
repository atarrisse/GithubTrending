import React from "react";

const Loading: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full motion-safe:animate-spin"></div>
      </div>
      <p className="text-gray-500 text-sm">Loading trending repositories...</p>
    </div>
  </div>
);

export default Loading;
