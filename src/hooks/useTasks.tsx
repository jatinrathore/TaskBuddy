import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

import Task, { PriorityLevel } from "../Task";

interface TasksContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  createTask: (task: Task) => void;
  updateTask: (id: number, newTask: Task) => void;
  // updateTaskName: (id: number, newName: string) => void;
  // updateDescription: (id: number, newName: string) => void;
  // updatePriority: (id: number, priority: PriorityLevel) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const defaultTasks: Task = {
  id: Date.now(),
  taskName: "Default",
  taskDescription: "Default Description",
  isCompleted: false,
  priorityLevel: PriorityLevel.Low,
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
  // updateTaskName: () => {
  //   console.log("Name changed");
  // },
  // updateDescription: () => {
  //   console.log("Discription Changed");
  // },
  // updatePriority: () => {
  //   console.log("PriorityUpdated");
  // },
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

  // const updateTaskName = (id: number, newName: string) => {
  //   const updatedTasks = tasks.map((task: Task) =>
  //     task.id === id ? { ...task, taskName: newName } : task
  //   );

  //   saveTasks(updatedTasks);
  // };

  // const updateDescription = (id: number, newDiscription: string) => {
  //   const updatedTasks = tasks.map((task: Task) =>
  //     task.id === id ? { ...task, taskDescription: newDiscription } : task
  //   );

  //   saveTasks(updatedTasks);
  // };

  // const updatePriority = (id: number, newPriority: PriorityLevel) => {
  //   const updatedTasks = tasks.map((task: Task) =>
  //     task.id === id ? { ...task, priorityLevel: newPriority } : task
  //   );

  //   saveTasks(updatedTasks);
  // };

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
