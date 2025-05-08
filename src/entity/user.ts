export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    skills?: string[];
    rating?: number;
    reviews: string[];
    createdAt: string;
    updatedAt: string;
    location: string;
    bio: string;
    image?: string; 
}
export type RegisterUser = Omit<User, "password" | "skills" | "rating" | "reviews" | "createdAt" | "updatedAt" | "bio" | "image"> 
