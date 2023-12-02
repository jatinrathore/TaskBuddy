import { Checkbox, Text, Box, IconButton, VStack } from "@chakra-ui/react";
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
        <VStack display="flex" alignItems="flex-start" width="60dvw">
          <Box display="flex">
            <Checkbox
              colorScheme={getColorScheme(priorityLevel)}
              borderColor={getColorScheme(priorityLevel)}
              isChecked={false}
              onChange={() => completeTask(id)}
            />
            <Text
              className="task--details__title"
              color="#5a5959"
              fontSize={{ base: "16px", md: "20px" }}
            >
              {title}
            </Text>
          </Box>
          <Text
            fontSize="13px"
            ml="40px"
            mb="10px"
            color="#a7a5a6"
            wordBreak="break-word"
          >
            {description}
          </Text>
        </VStack>
        <Box className="task--controller">
          <Box display="flex" alignItems="center">
            <Text mr="2rem" title="due-date" fontSize="12px" color="#fc839f">
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
    </Box>
  );
};

export default TaskItem;
