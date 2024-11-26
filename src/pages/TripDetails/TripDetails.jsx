import "./TripDetails.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/utils";
import axios from "axios";

function TripDetails() {
    const [trip, setTrip] = useState(null);
    const { tripId } = useParams();

    const getTrip = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/trips/${tripId}`);

            setTrip(data);
        } catch (error) {
            console.error("Error fetching trip:", error);
        }
    };

    useEffect(() => {
        getTrip();
    }, [tripId]);

    if (!trip) {
        return <div>Loading trip...</div>;
    }

    return <div>Trip Details</div>;
}

export default TripDetails;
