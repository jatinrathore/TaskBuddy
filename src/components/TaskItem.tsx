import { Checkbox, Text, Box, IconButton } from "@chakra-ui/react";
import "./TaskItem.css";
import { PriorityLevel } from "../Task";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTasks } from "../hooks/useTasks";
import UpdateModal from "./UpdateModal";

interface Props {
  id: number;
  title: string;
  description: string;
  priorityLevel: PriorityLevel;
}
const TaskItem = ({ id, title, description, priorityLevel }: Props) => {
  const { deleteTask, completeTask } = useTasks();

  const getColorScheme = (priority: string) => {
    if (priority === "low") return "yellow";
    if (priority === "medium") return "green";
    else return "red";
  };

  return (
    <Box className="task--container" mt="10px">
      <Box className="task--details">
        <Checkbox
          colorScheme={getColorScheme(priorityLevel)}
          borderColor={getColorScheme(priorityLevel)}
          onChange={() => completeTask(id)}
        />
        <Text className="task--details__title">{title}</Text>
        <Box className="task--controller">
          <Box>
            <Box as="button">
              <UpdateModal id={id} />
            </Box>
            <IconButton
              onClick={() => deleteTask(id)}
              color="red"
              background="none"
              aria-label="Delete"
              ml="5px"
              icon={<RiDeleteBin6Line />}
            />
          </Box>
        </Box>
      </Box>
      <Text fontSize="13px" ml="40px" mb="10px">
        {description}
      </Text>
    </Box>
  );
};

export default TaskItem;
