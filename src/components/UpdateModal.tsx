import {
  useDisclosure,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Input,
  Textarea,
  Select,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";
import { useRef } from "react";
import Task, { PriorityLevel } from "../Task";
import { useTasks } from "../hooks/useTasks";
import { PiNotePencilLight } from "react-icons/pi";

const UpdateModal = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasks, updateTask } = useTasks();

  const taskToUpdate = tasks.find((task) => task.id === id);

  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const prioritySelect = useRef<HTMLSelectElement>(null);

  const handleClick = () => {
    const title = nameInput.current?.value || "";
    const description = descriptionInput.current?.value || "";
    const priority = prioritySelect.current?.value || "";

    const getPriorityLevel = (priority: string) => {
      if (priority === "high") return PriorityLevel.High;
      else if (priority === "medium") return PriorityLevel.Medium;
      else return PriorityLevel.Low;
    };

    const task: Task = {
      id: Date.now(),
      taskName: title,
      taskDescription: description,
      priorityLevel: getPriorityLevel(priority),
      isCompleted: false,
    };

    updateTask(id, task);
    onClose();
  };

  return (
    <HStack spacing={4}>
      <IconButton
        background="none"
        aria-label="Edit"
        icon={<PiNotePencilLight />}
        onClick={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Input placeholder="Add Title" ref={nameInput}></Input>
              <Textarea
                placeholder="Add Description"
                ref={descriptionInput}
              ></Textarea>
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
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default UpdateModal;
