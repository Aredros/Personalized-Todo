import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { EditTodoForm } from "./EditTodoForm";

interface TodoProps {
  task: { id: string; task: string; completed: boolean; isEditing: boolean };
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
}
export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed && "completed"}`}
      >
        {task.task} / {task.nType ? task.nType : "No Type"}
      </p>
      <div>
        <FontAwesomeIcon icon={faEdit} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
