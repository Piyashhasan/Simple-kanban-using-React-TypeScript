import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { Task } from "../../model";

interface Props {
  task: Task;
  handleTaskComplete: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}

const SingleTodo = ({ task, handleTaskComplete, handleDeleteTask }: Props) => {
  return (
    <div>
      <div className="bg-yellow-400 p-5 rounded-md flex justify-between">
        <div>
          {task.isDone ? (
            <p className="break-word text-[14px]">
              <s>{task.task}</s>
            </p>
          ) : (
            <p className="break-word text-[14px]">{task.task}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
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
