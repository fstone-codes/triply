import "./Button.scss";

function Button({ classType, type, text }) {
    return (
        <button
            className={`button ${
                classType === "primary" ? "button--primary" : "button--secondary"
            }`}
            type={type}
        >
            {text}
        </button>
    );
}

export default Button;
