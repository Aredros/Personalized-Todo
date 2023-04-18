import React from "react";

interface TypeCounterProps {
  todos: {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
    nType: string;
  }[];
  getCountForType: (type: string) => number;
}

export const TypeCounter = ({ todos, getCountForType }: TypeCounterProps) => {
  return (
    <>
      {todos.some((e) => e.nType === "Health") && (
        <h3>Health tasks {getCountForType("Health")}</h3>
      )}
      {todos.some((e) => e.nType === "Studies") && (
        <h3>Studies tasks {getCountForType("Studies")}</h3>
      )}
      {todos.some((e) => e.nType === "Hobbies") && (
        <h3>Hobbies tasks {getCountForType("Hobbies")}</h3>
      )}
    </>
  );
};
