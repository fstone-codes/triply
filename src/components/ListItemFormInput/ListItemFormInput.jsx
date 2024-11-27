import "./ListItemFormInput.scss";

function ListItemForm({ listItem, handleListItemInputChange }) {
    return (
        <div className="item-form-input">
            <div className="item-form-input__container">
                <label className={`item-form-input__label `} htmlFor="item">
                    List Item
                </label>
                <input
                    className="item-form-input__input item-form-input__input--text"
                    type="text"
                    id="item"
                    name="item"
                    value={listItem.item || ""}
                    placeholder="Type your list item"
                    onChange={handleListItemInputChange}
                />
            </div>
            <div className="item-form-input__container">
                <label className={`item-form-input__label `} htmlFor="description">
                    Description
                </label>
                <textarea
                    className={`item-form-input__input`}
                    id="description"
                    name="description"
                    value={listItem.description || ""}
                    placeholder="Type your description"
                    onChange={handleListItemInputChange}
                />
            </div>
            <div className="item-form-input__container">
                <label className="item-form-input__label" htmlFor="status">
                    Status
                </label>
                <select
                    className="item-form-input__input"
                    id="status"
                    name="status"
                    onChange={handleListItemInputChange}
                >
                    <option value="">Select Status</option>
                    <option value="1">Not Started</option>
                    <option value="2">In Progress</option>
                    <option value="3">Complete</option>
                </select>
            </div>
            <div className="item-form-input__container">
                <label className="item-form-input__label" htmlFor="category">
                    Category
                </label>
                <input
                    className="item-form-input__input item-form-input__input--text"
                    type="text"
                    id="category"
                    name="category"
                    value={listItem.category || ""}
                    placeholder="Type your category"
                    onChange={handleListItemInputChange}
                />
            </div>
            {/* <div className="item-form-input__container">
                <label className={`item-form-input__label `} htmlFor={id}>
                    {label}
                </label>
                <select
                    className={`item-form-input__input `}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleListItemInputChange}
                >
                    <option value="">Select Status</option>
                    <option value="">Not Started</option>
                    <option value="">In Progress</option>
                    <option value="">Complete</option>
                </select>
            </div>
            <div className="item-form-input__container">
                <label className={`item-form-input__label `} htmlFor={id}>
                    {label}
                </label>
                <select
                    className={`item-form-input__input `}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleListItemInputChange}
                >
                    <option value="">Select Status</option>
                    <option value=""></option>
                </select>
            </div> */}
        </div>
    );
}

export default ListItemForm;
