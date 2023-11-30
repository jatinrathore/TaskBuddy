import { Text } from "@chakra-ui/react";
import { useTasks } from "../hooks/useTasks";
import CreateModal from "./CreateModal";
import TaskItem from "./TaskItem";
import "./TaskList.css";
import CompletedTaskItem from "./CompletedTaskItem";

const TasksList = () => {
  const { tasks } = useTasks();

  return (
    <div>
      <CreateModal />
      <div className="tasks--container">
        <Text className="tasks--container__heading">Tasks</Text>
        {tasks
          .filter((task) => task.isCompleted === false)
          .map((task, index) => (
            <TaskItem
              key={index}
              id={task.id}
              title={task.taskName}
              description={task.taskDescription || ""}
              priorityLevel={task.priorityLevel}
            ></TaskItem>
          ))}
        <Text className="tasks--container__heading" mt="20px">
          Completed Tasks
        </Text>
        {tasks
          .filter((task) => task.isCompleted === true)
          .map((task, index) => (
            <CompletedTaskItem
              key={index}
              id={task.id}
              title={task.taskName}
              description={task.taskDescription || ""}
            ></CompletedTaskItem>
          ))}
      </div>
    </div>
  );
};

export default TasksList;
