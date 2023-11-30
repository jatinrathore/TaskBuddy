import { HStack, Box, Text } from "@chakra-ui/react";
import { FaUserPen } from "react-icons/fa6";

const NavBar = () => {
  return (
    <HStack borderBottom="1px solid wheat">
      <Box display="flex" ml="10px" mb="10px" alignItems="end" cursor="default">
        <FaUserPen size="40px" />
        <Text fontSize="25px" fontWeight="600" ml="5px">
          TaskBuddy
        </Text>
      </Box>
    </HStack>
  );
};

export default NavBar;
