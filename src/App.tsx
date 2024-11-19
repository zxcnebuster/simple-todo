import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import Input from "./components/Input";

interface Task {
  name: string;
  dateCreated: number;
}

type TaskList = Task[];

function App() {
  const [tasks, setTasks] = useState<TaskList>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function debounce(
    callback: (...args: any[]) => void,
    timeout: number
  ): (...args: any[]) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback.apply(this, args);
      }, timeout);
    };
  }

  function onAddTask(): void {
    const taskName: string = inputRef.current?.value || ""; //good pattern
    setTasks([...tasks, { name: taskName, dateCreated: Date.now() }]);
  }

  function onDeleteTask(dateCreated: number): void {
    setTasks(tasks.filter((task) => task.dateCreated !== dateCreated));
  }
  const D_DELAY = 350;
  const debouncedOnDelete = debounce(onDeleteTask, D_DELAY);
  const debouncedOnAdd = debounce(onAddTask, D_DELAY);

  function addTask() {
    debouncedOnAdd();
  }
  function deleteTask(dateCreated: number) {
    debouncedOnDelete(dateCreated);
  }

  return (
    <div className="w-screen h-screen bg-blue-300 flex flex-col">
      <h1 className="text-2xl text-center font-bold p-4 text-white">
        To-do App
      </h1>
      <div className="flex flex-1 w-4/6 mx-auto flex-col">
        <Input ref={inputRef}></Input>
        <button
          className="bg-blue-500 font-bold text-md p-1 rounded-md text-white"
          onClick={debounce(addTask, 100)}
        >
          Add task
        </button>
        <ul className="w-4/6 flex flex-1 flex-col mb-10 bg-blue-100 rounded-xl p-2 m-auto mt-10 space-y-2">
          {tasks.map((task) => (
            <li
              key={task.dateCreated}
              className="flex flex-col bg-white rounded-xl p-2"
            >
              <span className="font-bold text-md text-md">{task.name}</span>
              <button
                onClick={debounce(() => deleteTask(task.dateCreated), 100)}
                className="bg-red-500 self-end p-1 rounded-md text-white font-semibold text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="flex w-4/6 m-auto">
 
      <ul className="w-4/6 flex flex-1 flex-col mb-10 bg-blue-100 rounded-xl p-2 m-auto space-y-2">
        <li className="flex flex-col bg-white rounded-xl p-2">
          <span className="font-bold text-md text-md">Task</span>
          <button className="bg-red-500 self-end p-1 rounded-md text-white font-semibold text-sm">
            Delete
          </button>
        </li>
        <li>task</li>
        <li>task</li>
      </ul> */}
    </div>
  );
}

export default App;
