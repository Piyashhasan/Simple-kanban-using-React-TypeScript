import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import { Task } from "./model";
import Todos from "./components/Todos/Todos";

function App() {
  const [task, setTask] = useState<string>("");
  const [allTask, setAllTask] = useState<Task[]>([]);

  // --- form submit handler ---
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) {
      return;
    }
    if (task) {
      setAllTask([
        ...allTask,
        {
          id: Number(Date.now()),
          task: task,
          isDone: false,
        },
      ]);
      setTask("");
    }
  };

  return (
    <main className="container">
      <h1 className="text-center mt-10 text-white text-[36px] font-['Playwrite_DK_Loopet'] relative z-10">
        KANBAN
      </h1>
      <InputField task={task} setTask={setTask} handleSubmit={handleSubmit} />
      <Todos allTask={allTask} setAllTask={setAllTask} />
    </main>
  );
}

export default App;
