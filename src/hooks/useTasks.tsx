import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import Task from "../Task";

interface TasksContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  createTask: (task: Task) => void;
  updateTask: (id: number, newTask: Task) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const defaultTasks: Task = {
  id: Date.now(),
  taskName: "Default",
  taskDescription: "Default Description",
  isCompleted: false,
  priorityLevel: "low",
  dueDate: "12/12/2023",
};

const defaultTasksContext: TasksContextType = {
  tasks: [defaultTasks],
  setTasks: () => {
    console.log("default tasks");
  },
  createTask: () => {
    console.log("task created");
  },
  updateTask: () => {
    console.log("task updated");
  },
  completeTask: () => {
    console.log("Task is Completed");
  },
  deleteTask: () => {
    console.log("Task is Deleted");
  },
};

const TaskContext = createContext<TasksContextType>(defaultTasksContext);

export const TaskContextWrapper = ({ children }: { children: ReactNode }) => {
  enum TaskBuddyTasks {
    TASK = "taskBuddy_tasks",
  }

  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem(TaskBuddyTasks.TASK) || "[]") as Task[]
  );

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem(TaskBuddyTasks.TASK, JSON.stringify(updatedTasks));
  };

  const createTask = (task: Task) => {
    const updatedTasks = [...tasks, task];

    saveTasks(updatedTasks);
  };

  const updateTask = (id: number, newTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...newTask } : task
    );

    saveTasks(updatedTasks);
  };

  const completeTask = (id: number) => {
    const updatedTasks = tasks.map((task: Task) =>
      task.id === id ? { ...task, isCompleted: true } : task
    );

    saveTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    saveTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask,
        updateTask,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
