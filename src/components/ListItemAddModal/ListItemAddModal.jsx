import "./ListItemAddModal.scss";
import ReactModal from "react-modal";
import ListItemForm from "../ListItemFormInput/ListItemFormInput";
import Button from "../Button/Button";

function ListItemAddModal({
    isOpen,
    setIsOpen,
    listItem,
    handleListItemSubmit,
    handleListItemInputChange,
}) {
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
                <form className="list-add__form" onSubmit={handleListItemSubmit}>
                    <h1 className="list-add__title">Add List Item</h1>
                    <ListItemForm
                        handleListItemInputChange={handleListItemInputChange}
                        listItem={listItem}
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
