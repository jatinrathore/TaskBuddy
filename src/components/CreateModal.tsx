import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import Task, { PriorityLevel } from "../Task";
import { useTasks } from "../hooks/useTasks";

const CreateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasks, createTask } = useTasks();

  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const prioritySelect = useRef<HTMLSelectElement>(null);

  const handleClick = () => {
    const title = nameInput.current?.value || "";
    const description = descriptionInput.current?.value || "";
    const priority = prioritySelect.current?.value || "";

    const getPriorityLevel = (priority: string) => {
      if (priority === "low") return PriorityLevel.Low;
      else if (priority === "medium") return PriorityLevel.Medium;
      else return PriorityLevel.High;
    };

    const task: Task = {
      id: Date.now(),
      taskName: title,
      taskDescription: description,
      priorityLevel: getPriorityLevel(priority),
      isCompleted: false,
    };

    createTask(task);
  };

  return (
    <HStack spacing={4}>
      <Button colorScheme="red" onClick={onOpen}>
        <Box display="flex" alignItems="center">
          <Text mr="5px">
            {tasks.length === 0 ? "Create New Task" : "Create Task"}
          </Text>
          <FaPlus size="12px" />
        </Box>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Input placeholder="Add Title" ref={nameInput}></Input>
              <Input
                placeholder="Add Description"
                ref={descriptionInput}
              ></Input>
              <Select
                placeholder="Select Priority"
                style={{ fontWeight: "500" }}
                ref={prioritySelect}
              >
                <option value="low" style={{ fontWeight: "500" }}>
                  Low
                </option>
                <option value="medium" style={{ fontWeight: "500" }}>
                  Medium
                </option>
                <option value="high" style={{ fontWeight: "500" }}>
                  High
                </option>
              </Select>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="cyan" variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="cyan" onClick={() => handleClick()}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default CreateModal;
