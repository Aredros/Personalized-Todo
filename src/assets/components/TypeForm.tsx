import React, { useState } from "react";

export const TypeForm = ({ addType }) => {
  const [typeValue, setTypeValue] = useState("");

  const handleSubmit = (e) => {
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
