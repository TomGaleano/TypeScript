import { useState, useEffect } from 'react';
import axios from 'axios';

interface BlogData {
    title: string;
    description: string;
    image: string;
    user_id: number;
}

interface EditBlogProps {
    id: string;
}

const EditBlog = ({ id }: EditBlogProps) => {
    const [blogData, setBlogData] = useState<BlogData>({
        title: '',
        description: '',
        image: '',
        user_id: 0,
    });



    useEffect(() => {
        const getBlog = async () => {
            const response = await axios.get(`http://localhost:3000/api/detailpost/${id}`, {
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
        const response = await axios.put(`http://localhost:3000/api/updatepost/${id}`, blogData, {
            withCredentials: true,
        });
        console.log(response.data);
    };

    return (
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
    );
};

export default EditBlog;