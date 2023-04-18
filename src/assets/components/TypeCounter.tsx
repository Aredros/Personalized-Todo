import React from "react";

export const TypeCounter = ({ todos, getCountForType }) => {
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
