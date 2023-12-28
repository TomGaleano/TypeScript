import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: ""
    });

    const navigate = useNavigate();


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', userData,{
                withCredentials: true});
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            navigate("/home");
        } catch (error) {
            console.error("Error during login:", error);
        }
        
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
            <label>
                Email:
                <input name="email" type="email" value={userData.email} onChange={handleChange} placeholder="Email" />
            </label>
            <label>
                Password:
                <input name="password" type="password" value={userData.password} onChange={handleChange} placeholder="Password" />
            </label>
            <button type="submit" style={{ marginTop: '20px' }}>Register</button>
        </form>
    );
}

export default Login;