import "./TripSetup.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { baseUrl } from "../../utils/utils";
import axios from "axios";

function TripSetup() {
    const navigate = useNavigate();
    const [tripId, setTripId] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        user_id: 1, // hardcoded user id to be refactored in sprint-2
        trip_name: "",
        destination: "",
        start_date: "",
        end_date: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        // if (!validateForm()) {
        //     return;
        // }

        addTrip();

        if (tripId) {
            navigate(`/trip/${tripId}/itinerary`);
        }
    };

    const addTrip = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/trips`, formData);

            setTripId(data.id);
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <main className="trip-setup">
            <form className="trip-setup__form" onSubmit={handleSubmit}>
                <h1 className="trip-setup__title">New Trip</h1>
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

export default TripSetup;
