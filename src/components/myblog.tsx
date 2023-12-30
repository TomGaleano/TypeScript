import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    user_id: number;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
}

export interface NewComponentProps {
    className?: string;
    children?: React.ReactNode;
}

export const UserPosts = ({
    className = "",
    children = null,
}: NewComponentProps) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/uniquepost`, {
                withCredentials: true});
            setPosts(response.data.data);
        };

        fetchPosts();
    }, []);

    return (
        <div className={`text-center ${className}`}>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <img src={post.image} alt={post.title} />
                </div>
            ))}
            {children}
        </div>
    );
}