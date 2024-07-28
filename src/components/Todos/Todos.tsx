import { useState } from "react";
import { Task } from "../../model";
import SingleTodo from "../SingleTodo/SingleTodo";

interface Props {
  allTask: Task[];
  setAllTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Todos = ({ allTask, setAllTask }: Props) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  // --- handler task done or not ---
  const handleTaskComplete = (id: number) => {
    if (id) {
      const updateCheck = allTask.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      );
      setAllTask(updateCheck);
      setEditingTaskId(null);
    }
  };

  //   --- handler delete task ---
  const handleDeleteTask = (id: number) => {
    const remainingTasks = allTask.filter((task) => task.id !== id);
    setAllTask(remainingTasks);
  };

  //   --- edit input field toggler handler ---
  const handleEditClick = (taskId: number) => {
    // Toggle the edit mode for the specific task
    setEditingTaskId(editingTaskId === taskId ? null : taskId);
  };

  const handleEditTask = (
    e: React.FormEvent<HTMLFormElement>,
    editedTask: string,
    id: number
  ) => {
    e.preventDefault();
    const updateTask = allTask.map((task) =>
      task.id === id ? { ...task, task: editedTask } : task
    );
    if (updateTask) {
      setAllTask(updateTask);
      setEditingTaskId(null);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5  mt-10">
      {allTask.map((task) => (
        <SingleTodo
          key={task.id}
          task={task}
          setAllTask={setAllTask}
          handleTaskComplete={handleTaskComplete}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleEditClick={handleEditClick}
          editingTaskId={editingTaskId}
        />
      ))}
    </div>
  );
};

export default Todos;
