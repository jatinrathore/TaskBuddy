import { Box, Text } from "@chakra-ui/react";
import { useTasks } from "../hooks/useTasks";
import CreateModal from "./CreateModal";
import TaskItem from "./TaskItem";
import "./TaskList.css";
import CompletedTaskItem from "./CompletedTaskItem";
import Task from "../Task";

const TasksList = () => {
  const { tasks } = useTasks();

  //sorting tasks on the basis of priority
  const priorityOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };

  const sortTasksByPriority = (tasks: Task[]) => {
    return tasks.slice().sort((a, b) => {
      return priorityOrder[a.priorityLevel] - priorityOrder[b.priorityLevel];
    });
  };

  const pendingTasks = tasks.filter((task) => task.isCompleted === false);
  const completedTasks = tasks.filter((task) => task.isCompleted === true);

  const sortedTasks = sortTasksByPriority(tasks);
  return (
    <div>
      <CreateModal />
      <div className="tasks--container">
        {pendingTasks.length > 0 ? (
          <Box display="flex" alignItems="center">
            <Text className="tasks--container__heading" color="#404040">
              Tasks
            </Text>
            <Text mb="20px">({pendingTasks.length})</Text>
          </Box>
        ) : (
          ""
        )}
        {sortedTasks
          .filter((task) => task.isCompleted === false)
          .map((task, index) => (
            <TaskItem
              key={index}
              id={task.id}
              title={task.taskName}
              description={task.taskDescription || ""}
              priorityLevel={task.priorityLevel}
              dueDate={task.dueDate}
            ></TaskItem>
          ))}
        {completedTasks.length > 0 ? (
          <Box display="flex" alignItems="center">
            <Text
              className="tasks--container__heading"
              mt="20px"
              color="#404040"
            >
              Completed Tasks
            </Text>
            <Text>({completedTasks.length})</Text>
          </Box>
        ) : (
          ""
        )}
        {sortedTasks
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
