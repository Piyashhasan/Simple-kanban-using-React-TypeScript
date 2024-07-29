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
  const [completedTask, setCompletedTask] = useState<Task[]>([]);
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

  const handleEditFormSubmit = (
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

  // --- Drag & Drop functionality ---
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 px-3">
        <div className="bg-[#33C3CD] p-5 rounded-md self-start">
          <Droppable droppableId="activeTask">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2 className="text-white text-[24px] font-['Playwrite_DK_Loopet']">
                  Active Tasks
                </h2>
                {allTask.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="mb-2 mt-5"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SingleTodo
                          key={task.id}
                          task={task}
                          setAllTask={setAllTask}
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
          <Droppable droppableId="completeTask">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2 className="text-white text-[24px] font-['Playwrite_DK_Loopet']">
                  Completed Tasks
                </h2>
                {completedTask.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="mb-2 mt-5"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SingleTodo
                          key={task.id}
                          task={task}
                          setAllTask={setCompletedTask}
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
      </div>
    </DragDropContext>
  );
};

export default Todos;
