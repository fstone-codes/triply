import "./ListItemAddModal.scss";
import ReactModal from "react-modal";
import ListItemFormInput from "../ListItemFormInput/ListItemFormInput";
import Button from "../Button/Button";

function ListItemAddModal({ isOpen, setIsOpen, newListItem, handleSubmit, handleInputChange }) {
    return (
        <ReactModal
            className="list-add"
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
            <div className="list-add__container">
                <form className="list-add__form" onSubmit={handleSubmit}>
                    <h1 className="list-add__title">Add List Item</h1>
                    <ListItemFormInput
                        handleInputChange={handleInputChange}
                        listItem={newListItem}
                    />
                    <div className="list-add__button-container">
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

export default ListItemAddModal;
