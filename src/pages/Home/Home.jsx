import "./Home.scss";
import { useNavigate } from "react-router-dom";
import logoText from "../../assets/logos/triply-logo-text-light.svg";
import Button from "../../components/Button/Button";

function Home() {
    const navigate = useNavigate();

    return (
        <main className="home">
            <div className="home__container">
                <img className="home__logo-text" src={logoText} alt="triply logo text" />
                <div className="home__button-container">
                    <Button
                        onClick={() => {
                            navigate("/register");
                        }}
                        classType="secondary"
                        type="button"
                        text="Sign Up"
                    />
                    <Button
                        onClick={() => {
                            navigate("/login");
                        }}
                        classType="primary"
                        type="button"
                        text="Login"
                    />
                </div>
            </div>
            {/* animation elements below */}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </main>
    );
}

export default Home;
