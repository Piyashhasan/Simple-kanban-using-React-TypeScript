import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { Task } from "../../model";
import { useState } from "react";

interface Props {
  task: Task;
  setAllTask: React.Dispatch<React.SetStateAction<Task[]>>;
  handleTaskComplete: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleEditTask: (
    e: React.FormEvent<HTMLFormElement>,
    updateTask: string,
    id: number
  ) => void;
  editingTaskId: number | null;
  handleEditClick: (taskId: number) => void;
}

const SingleTodo = ({
  task,
  handleTaskComplete,
  handleDeleteTask,
  handleEditTask,
  handleEditClick,
  editingTaskId,
}: Props) => {
  // --- edit task input filed visible toggler ---
  const [editTask, setEditTask] = useState<string>(task.task);

  return (
    <div>
      <div className="bg-yellow-400 p-5 rounded-md flex justify-between">
        <div>
          {task.isDone ? (
            <p className="break-word text-[14px]">
              <s>{task.task}</s>
            </p>
          ) : (
            <div className="break-word text-[14px]">
              {editingTaskId === task.id ? (
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    handleEditTask(e, editTask, task.id)
                  }
                >
                  <input
                    onChange={(e) => setEditTask(e.target.value)}
                    type="text"
                    value={editTask}
                  />
                </form>
              ) : (
                `${task.task}`
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() => handleEditClick(task.id)}
            className="cursor-pointer"
          >
            <CiEdit className="text-[18px]" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleDeleteTask(task.id)}
          >
            <FaRegTrashCan className="text-[18px]" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleTaskComplete(task.id)}
          >
            <FaCheck className="text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
