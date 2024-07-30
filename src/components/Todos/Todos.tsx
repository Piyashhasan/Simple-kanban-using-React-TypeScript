import { useState } from "react";
import { Task } from "../../model";
import SingleTodo from "../SingleTodo/SingleTodo";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface Props {
  allTask: Task[];
  setAllTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Todos = ({ allTask, setAllTask }: Props) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);

  // --- handler task done or not ---
  const handleTaskComplete = (id: number) => {
    if (id) {
      const doneToggledActiveTask = allTask.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      );

      const doneToggledCompletedTask = completedTask.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      );

      setAllTask(doneToggledActiveTask);
      setCompletedTask(doneToggledCompletedTask);
      setEditingTaskId(null);
    }
  };

  //   --- handler delete task ---
  const handleDeleteTask = (id: number) => {
    const remainingActiveTasks = allTask.filter((task) => task.id !== id);
    const remainingCompletedTasks = completedTask.filter(
      (task) => task.id !== id
    );

    setAllTask(remainingActiveTasks);
    setCompletedTask(remainingCompletedTasks);
  };

  //   --- edit input field toggler handler ---
  const handleEditClick = (taskId: number) => {
    // Toggle the edit mode for the specific task
    setEditingTaskId(editingTaskId === taskId ? null : taskId);
  };

  const handleEditFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    editedTask: string,
    id: number
  ) => {
    e.preventDefault();
    const editActiveTask = allTask.map((task) =>
      task.id === id ? { ...task, task: editedTask } : task
    );
    const editCompletedTask = completedTask.map((task) =>
      task.id === id ? { ...task, task: editedTask } : task
    );
    if (editActiveTask || editCompletedTask) {
      setAllTask(editActiveTask);
      setCompletedTask(editCompletedTask);
      setEditingTaskId(null);
    }
  };

  // --- Drag & Drop functionality ---
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // --- card swap functionality ---
    let add;
    const activeTask = allTask;
    const completeTask = completedTask;

    if (source.droppableId === "activeTask") {
      add = activeTask[source.index];
      activeTask.splice(source.index, 1);
    } else {
      add = completeTask[source.index];
      completeTask.splice(source.index, 1);
    }

    if (destination.droppableId === "activeTask") {
      activeTask.splice(destination.index, 0, add);
    } else {
      completeTask.splice(destination.index, 0, add);
    }
    setCompletedTask(completeTask);
    setAllTask(activeTask);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 px-3">
        <div className="bg-[#33C3CD] p-5 rounded-md self-start">
          <h2 className="text-white text-[24px] font-['Playwrite_DK_Loopet'] mb-5">
            Active Tasks
          </h2>
          <Droppable droppableId="activeTask">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-md ${
                  snapshot.isDraggingOver ? "bg-[#01DCE8]" : ""
                }`}
              >
                {allTask.map((task, index) => (
                  <Draggable
                    key={task.id.toString()}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SingleTodo
                          key={task.id}
                          task={task}
                          handleTaskComplete={handleTaskComplete}
                          handleDeleteTask={handleDeleteTask}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleEditClick={handleEditClick}
                          editingTaskId={editingTaskId}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="bg-[#EB6751] p-5 rounded-md self-start">
          <h2 className="text-white text-[24px] font-['Playwrite_DK_Loopet'] mb-5">
            Completed Tasks
          </h2>
          <Droppable droppableId="completeTask">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-md ${
                  snapshot.isDraggingOver ? "bg-[#F72700]" : ""
                }`}
              >
                {completedTask.map((task, index) => (
                  <Draggable
                    key={task.id.toString()}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SingleTodo
                          key={task.id}
                          task={task}
                          handleTaskComplete={handleTaskComplete}
                          handleDeleteTask={handleDeleteTask}
                          handleEditFormSubmit={handleEditFormSubmit}
                          editingTaskId={editingTaskId}
                          handleEditClick={handleEditClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Todos;
