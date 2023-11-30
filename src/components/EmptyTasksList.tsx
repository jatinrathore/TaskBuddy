import { Box, Text } from "@chakra-ui/react";
import CreateModal from "./CreateModal";

const EmptyTasksList = () => {
  return (
    <>
      <Box
        height="70dvh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontWeight={500} mb={5}>
          No tasks found. Create one to get started!
        </Text>
        <CreateModal />
      </Box>
    </>
  );
};

export default EmptyTasksList;
