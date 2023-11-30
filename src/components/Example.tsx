import { Button } from "@chakra-ui/react";
import { useTasks } from "../hooks/useTasks";
import { PriorityLevel } from "../Task";

const Example = () => {
  const { createTask, deleteTask, updatePriority } = useTasks();

  return (
    <Button
      onClick={() => {
        updatePriority(3, PriorityLevel.Low);
      }}
    >
      Click me
    </Button>
  );
};

export default Example;
