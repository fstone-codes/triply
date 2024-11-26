import "./FormInput.scss";

function FormInput({ id, label, type, name, value, placeholder, handleInputChange, minDate }) {
    return (
        <div className="form-input">
            <label className="form-input__label" htmlFor={id}>
                {label}
            </label>
            <input
                className={`form-input__input ${value ? "form-input__input--" + type : ""}`}
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleInputChange}
                min={type === "date" || type === "datetime-local" ? minDate : undefined}
            />
        </div>
    );
}

export default FormInput;
