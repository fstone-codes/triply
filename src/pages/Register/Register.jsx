import "./Register.scss";
import { baseUrl } from "../../utils/utils";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    // axios requests
    const addUser = async () => {
        try {
            await axios.add(`${baseUrl}/api/users`, formData);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(() => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        navigate(`/`);
    };

    // validation
    const validateForm = () => {
        if (
            !formData.first_name ||
            !formData.last_name ||
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirm_password
        ) {
            console.error("Missing required fields");
            return false;
        }

        return true;
    };
    return (
        <main className="register">
            <form className="register__form" onSubmit={handleSubmit}>
                <h1 className="register__title">Sign Up</h1>
                <FormInput
                    id="first_name"
                    label="First Name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    placeholder="Type your first name"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="last_name"
                    label="Last Name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    placeholder="Type your last name"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="username"
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Type a unique username"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Type your email"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Type your password"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    name="confirm-password"
                    value={formData.confirm_password}
                    placeholder="Type your password"
                    handleInputChange={handleInputChange}
                />
                <div className="register__button-container">
                    <Button classType="primary" type="submit" text="Submit" />
                    <Link className="login__link" to="/">
                        <Button classType="secondary" type="button" text="Cancel" />
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default Register;
