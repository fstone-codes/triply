import "./TripForm.scss";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";

function TripForm({ handleSubmit, title, formData, handleInputChange, today }) {
    return (
        <main className="trip-add-edit">
            <form className="trip-form" onSubmit={handleSubmit}>
                <h1 className="trip-form__title">{title}</h1>
                <FormInput
                    id="trip_name"
                    label="Trip Name"
                    type="text"
                    name="trip_name"
                    value={formData.trip_name}
                    placeholder="Type your trip name"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="destination"
                    label="Destination"
                    type="text"
                    name="destination"
                    value={formData.destination}
                    placeholder="Type your destination"
                    handleInputChange={handleInputChange}
                />
                <FormInput
                    id="start_date"
                    label="Start Date"
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    handleInputChange={handleInputChange}
                    minDate={today}
                />
                <FormInput
                    id="end_date"
                    label="End Date"
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    handleInputChange={handleInputChange}
                    minDate={formData.start_date || today}
                />
                <Button classType="primary" type="submit" text="Submit" />
            </form>
        </main>
    );
}

export default TripForm;
