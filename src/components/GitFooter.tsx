import { Box, Link, Text } from "@chakra-ui/react";
import { FaRegCopyright } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";

const GitFooter = () => {
  return (
    <Box
      padding="10px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" color="#8c8c8c">
        <FaRegCopyright size="12px" style={{ marginTop: "2px" }} />
        <Text fontSize={{ base: "13px", md: "15px" }} ml="5px">
          2023 TaskBuddy -
          <Link
            href="https://github.com/jatinrathore"
            _hover={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            - @jatinrathore
          </Link>
        </Text>
      </Box>
      <Link
        href="https://github.com/jatinrathore/TaskBuddy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSquareGithub size="30px" />
      </Link>
    </Box>
  );
};

export default GitFooter;
