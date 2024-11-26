import "./ListForm.scss";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";

function ListForm({ handleSubmit, title, formData, handleInputChange }) {
    return (
        <main className="list-add-edit">
            <form className="list-form" onSubmit={handleSubmit}>
                <h1 className="list-form__title">{title}</h1>
                <FormInput
                    id="list_name"
                    label="List Name"
                    type="text"
                    name="list_name"
                    value={formData.list_name}
                    placeholder="Type the list name"
                    handleInputChange={handleInputChange}
                />
                <Button classType="primary" type="submit" text="Submit" />
            </form>
        </main>
    );
}

export default ListForm;
