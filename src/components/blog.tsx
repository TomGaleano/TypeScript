import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface BlogData {
    id: number;
    title: string;
    description: string;
    image: string;
    user_id: number;
    user: User;
}

interface ApiResponse {
    data: BlogData;
}

interface BlogProps {
    id: string;
    className?: string;
    children?: React.ReactNode;
}

export const Blog = ({ id, className = "", children = null }: BlogProps) => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const getBlog = async () => {
            const response = await axios.get<ApiResponse>(`${process.env.REACT_APP_BACKEND_URL}/api/detailpost/${id}`,{
                withCredentials: true,
            });
            setBlog(response.data);
        }
        getBlog();
    }, [id]);

    const handleDelete = async () => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deletepost/${id}`,{
            withCredentials: true,
        });
        navigate("/");
    }

    return (
        <div className={`container ${className}`}>
            <div className="row">
                <div className="col-md-12">
                    <img src={blog?.data.image} alt={blog?.data.title} className="img-fluid" />
                    <h1>{blog?.data.title} </h1>
                    <h3>{blog?.data.description}</h3>
                    <p>Author: {blog?.data.user.first_name} {blog?.data.user.last_name}</p>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    {children}
                </div>
            </div>
        </div>
    );
}