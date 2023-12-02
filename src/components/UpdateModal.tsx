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
import { useTasks } from "../hooks/useTasks";
import { PiNotePencilLight } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateModal = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasks, updateTask } = useTasks();

  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);
  const prioritySelect = useRef<HTMLSelectElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    if (taskToUpdate) {
      const input = nameInput.current?.value;

      //prevent duplicates
      const customID = "custom-id-yes";
      if (input && input?.length < 3)
        return toast.warn("Title should be greater or equal to 3 characters.", {
          position: "top-center",
          toastId: customID,
        });

      const title = nameInput.current?.value || taskToUpdate.taskName;

      const description =
        descriptionInput.current?.value || taskToUpdate.taskDescription;

      const priority =
        prioritySelect.current?.value || taskToUpdate.priorityLevel;

      //checking for date value and then update it
      const date = dateInput.current?.value || "";
      if (date !== "") {
        const selectedDate = new Date(date);

        const formattedDate = selectedDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        taskToUpdate.dueDate = formattedDate;
      }
      taskToUpdate.taskName = title;
      taskToUpdate.taskDescription = description;
      taskToUpdate.priorityLevel = priority;
      updateTask(id, taskToUpdate);
    }

    onClose();
  };

  return (
    <HStack spacing={4}>
      <IconButton
        background="none"
        aria-label="Edit"
        title="Update Task"
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
        <ModalContent width={{ base: "90dvw" }}>
          <ModalHeader>Update Task</ModalHeader>
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
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default UpdateModal;
