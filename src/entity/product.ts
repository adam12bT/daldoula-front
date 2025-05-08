export interface Product {
    _id: string;
    posterID: string;
    title: string;
    description: string;
    category: string;
    budget: number;
    deadline?: string; // ISO date string format
    applicants: string[];
    status: "open" | "in progress" | "completed" | "closed";
    createdAt: string; // ISO date string format
    updatedAt: string; // ISO date string format
}
