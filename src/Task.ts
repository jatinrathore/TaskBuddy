export enum PriorityLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export default interface Task {
  id: number;
  taskName: string;
  taskDescription?: string;
  isCompleted?: boolean;
  priorityLevel: PriorityLevel;
}
