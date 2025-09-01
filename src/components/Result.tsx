'use client';

import React from 'react';

interface ResultProps {
  htmlContent: string;
}

const Result: React.FC<ResultProps> = ({ htmlContent }) => {
  return (
    <div className="flex-1 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <iframe
        title="Preview"
        srcDoc={htmlContent}
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default Result;
