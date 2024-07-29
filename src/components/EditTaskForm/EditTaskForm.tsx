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
}

const EditTaskForm = ({
  task,
  editTask,
  setEditTask,
  handleEditFormSubmit,
}: Props) => {
  return (
    <div>
      <form onSubmit={(e) => handleEditFormSubmit(e, editTask, task.id)}>
        <input
          onChange={(e) => setEditTask(e.target.value)}
          type="text"
          value={editTask}
        />
      </form>
    </div>
  );
};

export default EditTaskForm;
