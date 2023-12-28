import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
            const response = await axios.post('http://localhost:3000/api/register', userData);
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);
        }
        
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
            <label>
                First Name:
                <input name="first_name" value={userData.first_name} onChange={handleChange} placeholder="First Name" />
            </label>
            <label>
                Last Name:
                <input name="last_name" value={userData.last_name} onChange={handleChange} placeholder="Last Name" />
            </label>
            <label>
                Email:
                <input name="email" type="email" value={userData.email} onChange={handleChange} placeholder="Email" />
            </label>
            <label>
                Password:
                <input name="password" type="password" value={userData.password} onChange={handleChange} placeholder="Password" />
            </label>
            <label>
                Phone Number:
                <input name="phone" type="number" value={userData.phone} onChange={handleChange} placeholder="Phone Number" />
            </label>
            <button type="submit" style={{ marginTop: '20px' }}>Register</button>
        </form>
    );
}

export default Register