import { useEffect, useState } from "react";
import Blog from "./blog";
import EditBlog from "./editblog";
import NewBlog from "./newblog";
import ViewBlogs from "./viewblogs";

interface User {
    first_name: string;
    id: number;
    // Add other properties if needed
}

const Home = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userItem = localStorage.getItem("user");
        if (userItem !== null) {
            const userData: User = JSON.parse(userItem);
            setUser(userData);
        }
    }, []);

    return (
        <div>
            <h1>¡Hola {user?.first_name}!</h1>
            <ViewBlogs />
            <Blog id="6" />
            <EditBlog id="6" />
            {user?.id && <NewBlog userid={user.id} />}
        </div>
    );
}

export default Home;