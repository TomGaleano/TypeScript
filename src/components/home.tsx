import { useEffect, useState } from "react";
import Blog from "./blog";
import EditBlog from "./editblog";
import NewBlog from "./newblog";
import UserPosts from "./myblog";
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
            <h2>Todos los Blogs</h2>
            <ViewBlogs />
            <h2>Tus Blogs</h2>
            <UserPosts />
            <h2>Un Blog específico</h2>
            <Blog id="6" />
            <h2>Editar un Blog específico</h2>
            <EditBlog id="6" />
            <h2>Crear un nuevo Blog</h2>
            {user?.id && <NewBlog userid={user.id} />}
        </div>
    );
}

export default Home;