import "./TripForm.scss";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";

function TripForm({ handleSubmit, title, formData, handleInputChange, today, tripId }) {
    const location = useLocation();

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
                    reverse="true"
                />
                <FormInput
                    id="destination"
                    label="Destination"
                    type="text"
                    name="destination"
                    value={formData.destination}
                    placeholder="Type your destination"
                    handleInputChange={handleInputChange}
                    reverse="true"
                />
                <FormInput
                    id="start_date"
                    label="Start Date"
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    handleInputChange={handleInputChange}
                    minDate={today}
                    reverse="true"
                />
                <FormInput
                    id="end_date"
                    label="End Date"
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    handleInputChange={handleInputChange}
                    minDate={formData.start_date || today}
                    reverse="true"
                />
                <div className="trip-form__button-container">
                    <Button classType="primary" type="submit" text="Submit" reversePrimary="true" />
                    {location.pathname === "/trip/add" && (
                        <Link className="trip-form__link" to="/dashboard">
                            <Button
                                classType="secondary"
                                type="button"
                                text="Cancel"
                                reverseSecondary="true"
                            />
                        </Link>
                    )}
                    {location.pathname !== "/trip/add" && (
                        <Link className="trip-form__link" to={`/trip/${tripId}`}>
                            <Button
                                classType="secondary"
                                type="button"
                                text="Cancel"
                                reverseSecondary="true"
                            />
                        </Link>
                    )}
                </div>
            </form>
        </main>
    );
}

export default TripForm;
