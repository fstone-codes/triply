import "./Login.scss";
import { baseUrl } from "../../utils/utils";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(() => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        navigate(`/dashboard`);
    };

    // validation
    const validateForm = () => {
        if (!formData.email || !formData.password) {
            console.error("Missing required fields");
            return false;
        }

        return true;
    };
    return (
        <main className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Login</h1>
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
                <div className="login__button-container">
                    <Button classType="primary" type="submit" text="Submit" />
                    <Link className="login__link" to="/">
                        <Button classType="secondary" type="button" text="Cancel" />
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default Login;
