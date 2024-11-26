import "./TripAdd.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import dayjs from "dayjs";
import TripForm from "../../components/TripForm/TripForm";

function TripSetup() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        user_id: 1, // hardcoded user id to be refactored in sprint-2
        trip_name: "",
        destination: "",
        start_date: "",
        end_date: "",
    });

    // axios requests
    const addTrip = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/trips`, formData);

            navigate(`/trip/${data.id}/itinerary`);
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    // handle events
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!validateForm()) {
            return;
        }

        addTrip();
    };

    // validation
    const validateForm = () => {
        if (
            !formData.user_id ||
            !formData.trip_name ||
            !formData.destination ||
            !formData.start_date ||
            !formData.end_date
        ) {
            console.error("Missing required fields");
            return false;
        }

        return true;
    };

    const today = dayjs().format("YYYY-MM-DD");

    return (
        <>
            <TripForm
                handleSubmit={handleSubmit}
                title="New Trip"
                formData={formData}
                handleInputChange={handleInputChange}
                today={today}
            />
        </>
    );
}

export default TripSetup;
