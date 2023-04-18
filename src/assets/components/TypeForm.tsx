import React, { useState } from "react";

interface TypeFormProps {
  addType: (type: string) => void;
}

export const TypeForm = ({ addType }: TypeFormProps) => {
  const [typeValue, setTypeValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeValue) return;
    addType(typeValue);
    setTypeValue("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="Text-input">
        <input
          type="text"
          value={typeValue}
          placeholder="Introduce a New Type"
          className="todo-input"
          onChange={(e) => setTypeValue(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          New-type
        </button>
      </div>
    </form>
  );
};
