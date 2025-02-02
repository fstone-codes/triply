import "./Login.scss";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import setBodyColor from "../../utils/setBackgroundColor.js";
import { baseUrl } from "../../utils/utils.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    setBodyColor("#cfcaec");

    const validateUser = async () => {
        try {
            const { data } = await axios.post(
                `${baseUrl}/api/users/login`,
                formData
            );

            setCookie("access_token", data.access_token, {
                path: "/",
                secure: true,
                httpOnly: true,
            });

            // check if token is expired
            const { exp } = jwtDecode(data.access_token);
            const currentTime = Date.now() / 1000;

            if (exp < currentTime) {
                const refresh = await axios.post(
                    `${baseUrl}/api/users/refresh`,
                    { token: data.refresh_token }
                );

                if (refresh.data.refresh_token) {
                    setCookie("access_token", refresh.data.refresh_token, {
                        path: "/",
                        secure: true,
                        httpOnly: true,
                    });
                } else {
                    console.error("Invalid session, please login again");

                    setCookie("access_token", "", {
                        path: "/",
                        secure: true,
                        httpOnly: true,
                    });
                    navigate("/login");
                }
            }

            navigate("/dashboard");
        } catch (error) {
            console.error("Error fetching user:", error);
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
        setFormSubmitted(true);

        if (!validateForm) {
            return;
        }

        await validateUser();
    };

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
                        <Button
                            classType="secondary"
                            type="button"
                            text="Cancel"
                        />
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default Login;
