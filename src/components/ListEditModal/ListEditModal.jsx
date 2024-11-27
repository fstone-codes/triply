import "./ListEditModal.scss";
import ReactModal from "react-modal";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import ListItemFormInput from "../ListItemFormInput/ListItemFormInput";

function ListEditModal({
    isOpen,
    setIsOpen,
    formData,
    listItems,
    handleSubmit,
    handleInputChange,
}) {
    return (
        <ReactModal
            className="list-edit"
            isOpen={isOpen}
            // Attach modal to the main.jsx element (with id root)
            appElement={document.getElementById("root")}
            // The 2 lines below enable esc to close the modal
            shouldCloseOnEsc={true}
            onRequestClose={() => setIsOpen(false)}
            style={{
                overlay: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(19, 24, 44, 0.7)",
                },
            }}
        >
            <div className="list-edit__container">
                <form className="list-edit__form" onSubmit={handleSubmit}>
                    <h1 className="list-edit__title">Edit List</h1>
                    <FormInput
                        id="list_name"
                        label="List Name"
                        type="text"
                        name="list_name"
                        value={formData.list_name}
                        placeholder="Type the list name"
                        handleInputChange={handleInputChange}
                        reverse="true"
                    />
                    {listItems.map((listItem) => (
                        <ListItemFormInput
                            key={listItem.id}
                            listItem={listItem}
                            handleListItemInputChange={handleInputChange}
                        />
                    ))}
                    <div className="list-edit__button-container">
                        <Button
                            classType="primary"
                            type="submit"
                            text="Save"
                            reversePrimary="true"
                        />
                        <Button
                            classType="secondary"
                            type="button"
                            text="Cancel"
                            onClick={() => setIsOpen(false)}
                            reverseSecondary="true"
                        />
                    </div>
                </form>
            </div>
        </ReactModal>
    );
}

export default ListEditModal;
