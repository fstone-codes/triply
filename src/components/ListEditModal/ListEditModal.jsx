import "./ListEditModal.scss";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import ListItemFormInput from "../ListItemFormInput/ListItemFormInput";
import ReactModal from "react-modal";

function ListEditModal({
    isOpen,
    setIsOpen,
    useEditModal,
    formData,
    handleClick,
    listItems,
    categoryList,
    handleSubmit,
    handleInputChange,
    convertStatusToNumber,
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
                    <h2 className="list-edit__label">List Items</h2>
                    <div className="list-edit__list-container">
                        {listItems.map((listItem) => (
                            <ListItemFormInput
                                key={listItem.id}
                                listItem={listItem}
                                categoryList={categoryList}
                                handleInputChange={handleInputChange}
                                isOpen={isOpen}
                                useEditModal={useEditModal}
                                convertStatusToNumber={convertStatusToNumber}
                                onClick={() => {
                                    handleClick(listItem.id);
                                }}
                            />
                        ))}
                    </div>
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
