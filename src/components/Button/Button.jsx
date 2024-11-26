import "./Button.scss";

function Button({ classType, type, text, onClick, reversePrimary, reverseSecondary }) {
    return (
        <button
            className={`button ${
                classType === "primary" ? "button--primary" : "button--secondary"
            } ${reversePrimary ? "button--reverse-primary" : ""} ${
                reverseSecondary ? "button--reverse-secondary" : ""
            }`}
            type={type}
            onClick={type === "button" ? onClick : undefined}
        >
            {text}
        </button>
    );
}

export default Button;
