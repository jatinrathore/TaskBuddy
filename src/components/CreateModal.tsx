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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import Task from "../Task";
import { useTasks } from "../hooks/useTasks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasks, createTask } = useTasks();

  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const prioritySelect = useRef<HTMLSelectElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const title = nameInput.current?.value || "";
    const description = descriptionInput.current?.value || "";
    const priority = prioritySelect.current?.value || "low";
    const date = dateInput.current?.value || "";

    //changing date format
    let formattedDate = "";
    if (date !== "") {
      const selectedDate = new Date(date);
      formattedDate = selectedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    //prevent duplicates alerts
    const customID = "custom-id-yes";

    //validating title input
    if (title.length === 0)
      return toast.warn("Title field can't be empty", {
        position: "top-center",
        toastId: customID,
      });
    if (title.length < 3)
      return toast.warn("Title should be greater or equal to 3 characters.", {
        position: "top-center",
        toastId: customID,
      });

    const task: Task = {
      id: Date.now(),
      taskName: title,
      taskDescription: description,
      priorityLevel: priority,
      isCompleted: false,
      dueDate: formattedDate,
    };

    createTask(task);
    onClose();
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
        <ModalContent
          style={{
            transition: "all .20s ease-out",
          }}
          width={{ base: "90dvw" }}
        >
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Input placeholder="Add Title" ref={nameInput}></Input>
              <Textarea
                placeholder="Add Description"
                ref={descriptionInput}
              ></Textarea>
              <Input
                placeholder="Select Due Date and Time"
                title="set due date"
                type="date"
                ref={dateInput}
              />
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
