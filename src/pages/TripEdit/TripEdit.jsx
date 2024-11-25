import "./TripEdit.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import dayjs from "dayjs";
import TripForm from "../../components/TripForm/TripForm";

function TripEdit() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        user_id: "", // hardcoded user id to be refactored in sprint-2
        trip_name: "",
        destination: "",
        start_date: "",
        end_date: "",
    });

    // axios requests
    const getTrip = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/trips/${tripId}`);

            console.log(data);

            const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

            setFormData({
                user_id: data.user_id,
                trip_name: data.trip_name,
                destination: data.destination,
                start_date: formatDate(data.start_date),
                end_date: formatDate(data.end_date),
            });
        } catch (error) {
            console.error("Error fetching trip:", error);
        }
    };

    const editTrip = async () => {
        try {
            await axios.put(`${baseUrl}/api/trips/${tripId}`, formData);

            getTrip();
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    useEffect(() => {
        getTrip();
    }, [tripId]);

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

        editTrip();

        if (tripId) {
            navigate(`/trip/${tripId}/itinerary`);
        }
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

        if (formData.end_date < formData.start_date) {
            console.error("Invalid end date");
            return false;
        }

        return true;
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <>
            <TripForm
                handleSubmit={handleSubmit}
                title="Edit Trip"
                formData={formData}
                handleInputChange={handleInputChange}
                today={today}
            />
        </>
    );
}

export default TripEdit;
