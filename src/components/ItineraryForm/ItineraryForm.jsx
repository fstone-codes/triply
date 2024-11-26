import "./ItineraryForm.scss";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";

function ItineraryForm({ handleSubmit, title, formData, handleInputChange, today }) {
    return (
        <main className="itinerary-add-edit">
            <form className="itinerary-form" onSubmit={handleSubmit}>
                <h1 className="itinerary-form__title">{title}</h1>
                <FormInput
                    id="title"
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Type the event title"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="description"
                    label="Description"
                    type="text"
                    name="description"
                    value={formData.description}
                    placeholder="Type your description"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="start"
                    label="Start Date + Time"
                    type="datetime-local"
                    name="start"
                    value={formData.start}
                    handleInputChange={handleInputChange}
                    minDate={today}
                />
                <FormInput
                    id="end"
                    label="End Date + Time"
                    type="datetime-local"
                    name="end"
                    value={formData.end}
                    handleInputChange={handleInputChange}
                    minDate={formData.start || today}
                />
                <div className="itinerary-form__container">
                    <label className="itinerary-form__label" htmlFor="all_day">
                        All Day
                    </label>
                    <input
                        className="itinerary-form__input itinerary-form__input--checkbox"
                        id="all_day"
                        type="checkbox"
                        name="all_day"
                        value={formData.all_day}
                        onChange={handleInputChange}
                    />
                </div>
                <Button classType="primary" type="submit" text="Submit" />
            </form>
        </main>
    );
}

export default ItineraryForm;
