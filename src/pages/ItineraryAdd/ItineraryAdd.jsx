import "./ItineraryAdd.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import dayjs from "dayjs";
import ItineraryForm from "../../components/ItineraryForm/ItineraryForm";

function ItineraryAdd() {
    const navigate = useNavigate();
    const { tripId } = useParams();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        trip_id: tripId,
        title: "",
        description: "",
        start: "",
        end: "",
        all_day: false,
    });

    // axios requests
    const addItinerary = async () => {
        try {
            await axios.post(`${baseUrl}/api/itineraries`, formData);

            return true;
        } catch (error) {
            console.error("Error creating itinerary item:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "all_day") {
            const isAllDay = checked;
            const startOfDay = dayjs(formData.start || dayjs())
                .startOf("day")
                .format("YYYY-MM-DDTHH:mm");
            const endOfDay = dayjs(formData.start || dayjs())
                .endOf("day")
                .add(1, "minute")
                .format("YYYY-MM-DDTHH:mm");

            setFormData((prevData) => ({
                ...prevData,
                all_day: isAllDay,
                start: isAllDay ? startOfDay : prevData.start,
                end: isAllDay ? endOfDay : prevData.end,
            }));
        } else if (name === "end") {
            const adjustedEnd =
                dayjs(value).hour() === 0 && dayjs(value).minute() === 0
                    ? dayjs(value).add(1, "minute").format("YYYY-MM-DDTHH:mm")
                    : value;

            setFormData((prevData) => ({
                ...prevData,
                [name]: adjustedEnd,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        console.log(formData);

        if (!validateForm()) {
            return;
        }

        if (addItinerary()) {
            navigate(`/trip/${tripId}/itinerary`);
        }
    };

    // validation
    const validateForm = () => {
        if (
            !formData.trip_id ||
            !formData.title ||
            !formData.start ||
            !formData.end ||
            formData.all_day === undefined
        ) {
            console.error("Missing required fields");
            return false;
        }

        if (dayjs(formData.start).isAfter(dayjs(formData.end))) {
            console.error("Start date must be before end date");
            return false;
        }

        return true;
    };

    const currentDateTime = dayjs().format("YYYY-MM-DDTHH:mm");

    return (
        <>
            <ItineraryForm
                handleSubmit={handleSubmit}
                title="New Itinerary Event"
                formData={formData}
                handleInputChange={handleInputChange}
                today={currentDateTime}
            />
        </>
    );
}

export default ItineraryAdd;
