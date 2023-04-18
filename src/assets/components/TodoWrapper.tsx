import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { TypeCounter } from "./TypeCounter";
import { TypeForm } from "./TypeForm";
uuidv4();

// Define interface for Todo object
interface ITodo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  nType: string;
  date: string;
}

export const TodoWrapper = () => {
  //state to store the todos
  const [todos, setTodos] = useState<ITodo[]>([]); // Specify type as ITodo[]
  const [types, setTypes] = useState(["Health", "Studies", "Hobbies"]);

  //function to fetch the previous todos from LocalStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todosLocal");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); //the empty array is to make sure the useEffect only runs once

  //function to add a TODO
  const addTodo = (todo: string, type: string, date: string) => {
    //create a new todo object
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
      nType: type,
      //date of creation
      date: date,
    };
    //this will add the new todo to the beginning of the array by using the spread operator
    //and then add the rest of the todos to the array using the spread operator again
    //update the todos state with the new todo
    setTodos([...todos, newTodo]);
    //store the updated todos state in LocalStorage
    localStorage.setItem("todosLocal", JSON.stringify([...todos, newTodo]));
  };

  //function to delete a TODO
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    //store the updated todos state in LocalStorage
    localStorage.setItem(
      "todosLocal",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  };

  //function to change the status of a TODO
  //by using the map function we can loop through the todos array and change the status of the todo
  //that matches the id that was passed in
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    //store the updated todos state in LocalStorage
    localStorage.setItem(
      "todosLocal",
      JSON.stringify(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };

  //function to start the process of editing a TODO //starts the editing status
  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
    //change the editing status in localStorage
    localStorage.setItem(
      "todosLocal",
      JSON.stringify(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      )
    );
  };

  //function to finish the editing process //ends the editing status
  const editTask = (task: string, type: string, date: string, id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task: task,
              nType: type,
              date: date,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
    //change the editing status in localStorage
    localStorage.setItem(
      "todosLocal",
      JSON.stringify(
        todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                task: task,
                nType: type,
                date: date,
                isEditing: !todo.isEditing,
              }
            : todo
        )
      )
    );
  };

  //function to create a new Type
  const addType = (type: string) => {
    //check if the type already exists
    if (!types.includes(type)) {
      //add the new type to the types array
      setTypes([...types, type]);
    }
  };

  //function to get the count of items for a specific age
  const getCountForType = (type: string) => {
    return todos.filter((todo) => todo.nType === type).length;
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>
      <TypeCounter todos={todos} getCountForType={getCountForType} />
      <TodoForm addTodo={addTodo} types={types} />
      {todos.map((todo, index) => {
        //show the date if it's the first todo or if the date is different from the previous todo
        const showDate = index === 0 || todos[index - 1].date !== todo.date;
        return (
          <React.Fragment key={index}>
            {showDate && (
              <h4 className="date-title">
                {
                  //use the new Date function to convert the date string to a date object
                  new Date(todo.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                }
              </h4>
            )}
            {todo.isEditing ? (
              <EditTodoForm task={todo} types={types} editTask={editTask} />
            ) : (
              <Todo
                task={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )}
          </React.Fragment>
        );
      })}
      <TypeForm addType={addType} />
    </div>
  );
};
