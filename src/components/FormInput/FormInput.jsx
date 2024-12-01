import "./FormInput.scss";

function FormInput({
    id,
    label,
    type,
    name,
    value,
    placeholder,
    minDate,
    reverse,
    handleInputChange,
}) {
    return (
        <div className="form-input">
            <label
                className={`form-input__label ${reverse ? "form-input__label--reverse" : ""}`}
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className={`form-input__input ${value ? "form-input__input--" + type : ""}`}
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                min={type === "date" || type === "datetime-local" ? minDate : undefined}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default FormInput;
