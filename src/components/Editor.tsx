'use client';

import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript'; // Default mode, can be changed via props
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/ext-language_tools'; // For autocompletion, snippets, etc.

// Placeholder for Zustand store. In a real app, this would be defined elsewhere.
// For now, we'll just use a simple state management for demonstration.
interface EditorStore {
  code: string;
  setCode: (code: string) => void;
}

// This would typically come from a separate Zustand store file, e.g., lib/store.ts
// For this example, we'll mock it.
const useEditorStore = (initialCode: string): EditorStore => {
  const [code, setCode] = React.useState(initialCode);
  return { code, setCode };
};

interface EditorProps {
  initialCode?: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ initialCode = '', onChange }) => {
  const { code, setCode } = useEditorStore(initialCode);

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AceEditor
        mode="javascript" // Can be made dynamic via props
        theme="terminal" // Default theme
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        value={code}
        onChange={handleEditorChange}
        width="100%"
        height="100%"
        className="flex-1" // Ensure it takes available height
      />
    </div>
  );
};

export default Editor;
