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

export interface ViewBlogsProps {
    className?: string;
    children?: React.ReactNode;
}

export const ViewBlogs = ({
    className = "",
    children = null,
}: ViewBlogsProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/allpost?page=${page}`, {
                withCredentials: true});
            setPosts(response.data.data);
        };

        fetchPosts();
    }, [page]);

    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className={`text-center ${className}`}>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <img src={post.image} alt={post.title} />
                    <p>Author: {post.user.first_name} {post.user.last_name}</p>
                </div>
            ))}
            <button onClick={prevPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
            {children}
        </div>
    );
}