

import { RegisterUser } from './../entity/user';
import axios from "axios";
import { User } from "./../entity/user"
import { Product } from "../entity/product";
import { io } from 'socket.io-client';



const api = axios.create({
    baseURL: "http://localhost:6005/api",
    headers: {
        "Content-Type": "application/json",
    },
});
export const socket = io('http://localhost:6005', {
    transports: ['websocket'],
    withCredentials: true,
  });
interface LoginResponse {
    token: string;
}
interface ApiResponse<T> {
    msg?: string;
}


// Authentication APIs
export const loginUser = async (email: string, password: string): Promise<LoginResponse & { user: User }> => {
    try {
        const response = await api.post<ApiResponse<{ token: string }>>('/signIn', { email, password });


        console.log("Login API Response:", response.data);


        if (!response.data.token) {
            throw new Error("Invalid response format: Missing token");

        }


        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.msg || "Error during login");
    }
};



export const registerUser = async (userData: RegisterUser): Promise<User> => {
    try {
        const response = await api.post<{ data: User }>('/users', userData);
        return response.data.data;
    } catch (error: any) {
        console.error("Registration Error:", error);
        throw new Error(error.response?.data?.msg || 'Error during registration');
    }
};


// User Management APIs
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching users:", error);
        throw error;
    }
};


export const updateUser = async (id: string, user: Partial<User>): Promise<any> => {
    try {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    } catch (error: any) {
        console.error("Error updating user:", error);
        throw error;
    }
};


export const getOneUser = async (id: string, token: string): Promise<User> => {
    try {
        const response = await api.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user:", error);
        throw error;
    }
};


// Product Management APIs
export const addProduct = async (product: Partial<Product>): Promise<Product> => {
    try {
        const response = await api.post("/products", product);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data.msg || "Error adding product");
    }
};


export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get("/products");
        return response.data.products;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


export const deleteProduct = async (id: string): Promise<any> => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error deleting product:", error);
        throw error;
    }
};


export const getProductsByType = async (type: string): Promise<Product[]> => {
    try {
        const response = await api.get(`/products/type/${type}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


export const getProductByID = async (id: string): Promise<Product> => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data.product;
    } catch (error: any) {
        console.error("Error fetching product:", error);
        throw error;
    }
};


export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    try {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    } catch (error: any) {
        console.error("Error updating product:", error);
        throw error;
    }
};


export const getProductByUserID = async (id: string): Promise<Product[]> => {
    try {
        const response = await api.get(`/productsbyusers/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user products:", error);
        throw error;
    }
};
export const getMessages = async (id: string,id2 : string): Promise<Product[]> => {
    try {
        const response = await api.get(`/chat/${id}/${id2}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching chats", error);
        throw error;
    }
};
export const getchatPartners = async (id: string): Promise<User>  => {
    try {
        const response = await api.get(`/chat-user/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching chats", error);
        throw error;
    }
};


// Transaction APIs
