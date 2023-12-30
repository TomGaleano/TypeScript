import { useState, useEffect } from 'react';
import axios from 'axios';

interface BlogData {
    title: string;
    description: string;
    image: string;
    user_id: number;
}

export interface EditBlogProps {
    id: string;
    className?: string;
    children?: React.ReactNode;
}

export const EditBlog = ({ id, className = "", children = null }: EditBlogProps) => {
    const [blogData, setBlogData] = useState<BlogData>({
        title: '',
        description: '',
        image: '',
        user_id: 0,
    });

    useEffect(() => {
        const getBlog = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/detailpost/${id}`, {
                withCredentials: true,
            });
            setBlogData(response.data.data);
        };
        getBlog();
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBlogData({
            ...blogData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/updatepost/${id}`, blogData, {
            withCredentials: true,
        });
        console.log(response.data);
    };

    return (
        <div className={`text-center ${className}`}>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={blogData.title} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={blogData.description} onChange={handleChange} />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" value={blogData.image} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
            </form>
            {children}
        </div>
    );
};