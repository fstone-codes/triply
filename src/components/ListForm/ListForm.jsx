import "./ListForm.scss";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import { Link } from "react-router-dom";

function ListForm({ handleSubmit, title, formData, handleInputChange, tripId }) {
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
                    reverse="true"
                />
                <div className="list-form__button-container">
                    <Button classType="primary" type="submit" text="Submit" reversePrimary="true" />
                    <Link className="list-form__link" to={`/trip/${tripId}/list`}>
                        <Button
                            classType="secondary"
                            type="button"
                            text="Cancel"
                            reverseSecondary="true"
                        />
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default ListForm;
