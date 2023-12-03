import { IconButton, Box, Text, VStack } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTasks } from "../hooks/useTasks";
import "./TaskItem.css";

interface Props {
  id: number;
  title: string;
  description: string;
}

const CompletedTaskItem = ({ id, title, description }: Props) => {
  const { deleteTask } = useTasks();

  return (
    <Box className="task--container" mt="10px">
      <Box className="task--details">
        <VStack display="flex" alignItems="flex-start" width="60dvw">
          <Box display="flex">
            <Text
              className="task--details__title"
              color="#5a5959"
              textDecoration="line-through"
              fontSize={{ base: "16px", md: "20px" }}
            >
              {title}
            </Text>
          </Box>
          <Text
            fontSize="13px"
            ml="30px"
            mb="10px"
            color="#a7a5a6"
            wordBreak="break-word"
            textDecoration="line-through"
          >
            {description}
          </Text>
        </VStack>
        <Box className="task--controller">
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
  );
};

export default CompletedTaskItem;
