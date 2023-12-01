import { IconButton, Box, Text } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTasks } from "../hooks/useTasks";

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
        <Text
          className="task--details__title"
          style={{ textDecoration: "line-through" }}
          color="#5a5959"
        >
          {title}
        </Text>
        <Box className="task--controller">
          <Box>
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
      <Text
        fontSize="13px"
        ml="20px"
        mb="10px"
        style={{ textDecoration: "line-through" }}
        color="#a7a5a6"
      >
        {description}
      </Text>
    </Box>
  );
};

export default CompletedTaskItem;
