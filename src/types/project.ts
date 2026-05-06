export type Project = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Not Started" | "In Progress" | "Completed";
  category: string;
};