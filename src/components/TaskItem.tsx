import { Checkbox, Text, Box, IconButton } from "@chakra-ui/react";
import "./TaskItem.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTasks } from "../hooks/useTasks";
import UpdateModal from "./UpdateModal";

interface Props {
  id: number;
  title: string;
  description: string;
  priorityLevel: string;
  dueDate: string;
}
const TaskItem = ({
  id,
  title,
  description,
  priorityLevel,
  dueDate,
}: Props) => {
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
          isChecked={false}
          onChange={() => completeTask(id)}
        />
        <Text className="task--details__title" color="#5a5959">
          {title}
        </Text>
        <Box className="task--controller">
          <Box display="flex" alignItems="center">
            <Text mr="50px" title="due-date" fontSize="12px" color="#fc839f">
              {dueDate}
            </Text>
            <UpdateModal id={id} />
            <IconButton
              onClick={() => deleteTask(id)}
              color="red"
              background="none"
              aria-label="Delete"
              title="Delete Task"
              ml="5px"
              icon={<RiDeleteBin6Line />}
            />
          </Box>
        </Box>
      </Box>
      <Text fontSize="13px" ml="40px" mb="10px" color="#a7a5a6">
        {description}
      </Text>
    </Box>
  );
};

export default TaskItem;
