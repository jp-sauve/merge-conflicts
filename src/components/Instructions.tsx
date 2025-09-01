'use client';

import React, { useState } from 'react';

interface InstructionsProps {
  isAdmin?: boolean;
  initialContent?: string;
  onContentChange?: (content: string) => void;
}

const Instructions: React.FC<InstructionsProps> = ({
  isAdmin = false,
  initialContent = 'Default instructions content.',
  onContentChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing && onContentChange) {
      onContentChange(content);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className={`bg-gray-800 text-white p-4 transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'} flex flex-col`}>
      <div className="flex justify-between items-center mb-2">
        {isOpen && <h2 className="text-lg font-bold">Instructions</h2>}
        <button
          onClick={handleToggle}
          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {isOpen ? '<' : '>'}
        </button>
      </div>

      {isOpen && (
        <div className="flex-1 flex flex-col">
          {isAdmin && (
            <div className="mb-2">
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          )}
          {isEditing ? (
            <textarea
              className="w-full h-full bg-gray-700 text-white p-2 rounded resize-none focus:outline-none"
              value={content}
              onChange={handleContentChange}
            />
          ) : (
            <div className="prose prose-invert text-sm overflow-auto flex-1">
              {/* Render content as markdown or plain text */}
              <p>{content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Instructions;
