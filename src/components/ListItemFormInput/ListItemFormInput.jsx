import "./ListItemFormInput.scss";

function ListItemFormInput({ useEditModal, listItem, categoryList, handleInputChange, onClick }) {
    return (
        <div className="item-form-input">
            <div className="item-form-input__container">
                <label className="item-form-input__label" htmlFor="item">
                    List Item
                </label>
                <input
                    className="item-form-input__input item-form-input__input--text"
                    type="text"
                    id="item"
                    name="item"
                    value={listItem.item}
                    placeholder="Type your list item"
                    onChange={handleInputChange}
                    onClick={onClick}
                />
            </div>
            <div className="item-form-input__container">
                <label className={`item-form-input__label `} htmlFor="description">
                    Description
                </label>
                <textarea
                    className="item-form-input__input item-form-input__input--textarea"
                    id="description"
                    name="description"
                    value={listItem.description}
                    placeholder="Type your description"
                    onChange={handleInputChange}
                    onClick={onClick}
                />
            </div>
            <div className="item-form-input__container">
                <label className="item-form-input__label" htmlFor="status">
                    Status
                </label>
                <select
                    className="item-form-input__input item-form-input__input--select"
                    id="status"
                    name="status"
                    onChange={handleInputChange}
                    onClick={onClick}
                >
                    <option value="">Select Status</option>
                    <option value={1}>Not Started</option>
                    <option value={2}>In Progress</option>
                    <option value={3}>Complete</option>
                </select>
            </div>
            {!useEditModal && (
                <div className="item-form-input__container">
                    <label className="item-form-input__label" htmlFor="category">
                        Category
                    </label>
                    <input
                        className="item-form-input__input item-form-input__input--text"
                        type="text"
                        id="category"
                        name="category"
                        value={listItem.category}
                        placeholder="Type your category"
                        onChange={handleInputChange}
                        onClick={onClick}
                    />
                </div>
            )}
            {useEditModal && (
                <div className="item-form-input__container">
                    <label className="item-form-input__label" htmlFor="category">
                        Category
                    </label>
                    <select
                        className="item-form-input__input item-form-input__input--select"
                        id="category"
                        name="category"
                        value={listItem.category}
                        onChange={handleInputChange}
                        onClick={onClick}
                    >
                        <option value="">Select Status</option>
                        {categoryList.map((category) => (
                            <option key={category.id} value={category.category}>
                                {category.category}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default ListItemFormInput;
