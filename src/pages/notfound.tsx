import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
