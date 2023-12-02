export default interface Task {
  id: number;
  taskName: string;
  taskDescription: string;
  isCompleted: boolean;
  priorityLevel: string;
  dueDate: string;
}
