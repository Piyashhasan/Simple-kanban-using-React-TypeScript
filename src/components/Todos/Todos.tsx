import { Task } from "../../model";
import SingleTodo from "../SingleTodo/SingleTodo";

interface Props {
  allTask: Task[];
  setAllTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Todos = ({ allTask, setAllTask }: Props) => {
  // --- handle task done or not ---
  const handleTaskComplete = (id: number) => {
    if (id) {
      const updateCheck = allTask.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      );
      setAllTask(updateCheck);
    }
  };

  //   --- handle delete task ---
  const handleDeleteTask = (id: number) => {
    const remainingTasks = allTask.filter((task) => task.id !== id);
    setAllTask(remainingTasks);
  };

  return (
    <div className="grid grid-cols-4 gap-5  mt-10">
      {allTask.map((task) => (
        <SingleTodo
          key={task.id}
          task={task}
          handleTaskComplete={handleTaskComplete}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default Todos;
