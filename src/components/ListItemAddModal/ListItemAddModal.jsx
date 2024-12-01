import "./ListItemAddModal.scss";
import Button from "../Button/Button";
import ListItemFormInput from "../ListItemFormInput/ListItemFormInput";
import ReactModal from "react-modal";

function ListItemAddModal({
    isOpen,
    setIsOpen,
    newListItem,
    handleModalClose,
    handleSubmit,
    handleInputChange,
    convertStatusToNumber,
}) {
    return (
        <ReactModal
            className="list-add"
            isOpen={isOpen}
            // Attach modal to the main.jsx element (with id root)
            appElement={document.getElementById("root")}
            // The 2 lines below enable esc to close the modal
            shouldCloseOnEsc={true}
            onRequestClose={() => {
                setIsOpen(false);
                handleModalClose(false);
            }}
            style={{
                overlay: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(19, 24, 44, 0.7)",
                    outline: "none",
                },
            }}
        >
            <div className="list-add__container">
                <form className="list-add__form" onSubmit={handleSubmit}>
                    <h1 className="list-add__title">Add List Item</h1>
                    <ListItemFormInput
                        handleInputChange={handleInputChange}
                        listItem={newListItem}
                        convertStatusToNumber={convertStatusToNumber}
                        useEditModal={false}
                        onClick={() => {}}
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
                            onClick={() => {
                                setIsOpen(false);
                                handleModalClose(false);
                            }}
                            reverseSecondary="true"
                        />
                    </div>
                </form>
            </div>
        </ReactModal>
    );
}

export default ListItemAddModal;
