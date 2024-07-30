import { Task } from "../../model";

interface Props {
  task: Task;
  editTask: string;
  setEditTask: React.Dispatch<React.SetStateAction<string>>;
  handleEditFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    updateTask: string,
    id: number
  ) => void;

  editInputFocus: React.RefObject<HTMLInputElement>;
}

const EditTaskForm = ({
  task,
  editTask,
  setEditTask,
  handleEditFormSubmit,
  editInputFocus,
}: Props) => {
  return (
    <div className="">
      <form onSubmit={(e) => handleEditFormSubmit(e, editTask, task.id)}>
        <input
          ref={editInputFocus}
          className="outline-none bg-yellow-400 w-40 md:w-40 lg:w-80"
          onChange={(e) => setEditTask(e.target.value)}
          type="text"
          value={editTask}
        />
      </form>
    </div>
  );
};

export default EditTaskForm;
