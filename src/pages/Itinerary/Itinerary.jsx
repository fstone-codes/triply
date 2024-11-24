import "./Itinerary.scss";
import { useParams } from "react-router-dom";
import { Calendar } from "react-big-calendar";
import djLocalizer from "../../utils/dayjsLocalizer.js";
import { baseUrl } from "../../utils/utils.js";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function Itinerary() {
    const [currentTrip, setCurrentTrip] = useState(null);
    const [itineraries, setItineraries] = useState(null);
    const { tripId } = useParams();

    const getSingleTrip = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/trips/${tripId}`);

            setCurrentTrip(data);
        } catch (error) {
            console.error("Error fetching trip:", error);
        }
    };

    const getItineraries = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/itineraries`);

            const parsedEvents = data.map((event) => ({
                ...event,
                start: dayjs(event.start).toDate(),
                end: dayjs(event.end).toDate(),
            }));

            setItineraries(parsedEvents);
        } catch (error) {
            console.error("Error fetching itineraries:", error);
        }
    };

    useEffect(() => {
        getSingleTrip();
    }, [tripId]);

    useEffect(() => {
        getItineraries();
    }, []);

    if (!currentTrip || !itineraries) {
        return <div>Loading trip itinerary...</div>;
    }

    return (
        <main className="itinerary">
            <div className="calendar">
                <Calendar
                    localizer={djLocalizer}
                    events={itineraries}
                    startAccessor="start"
                    endAccessor="end"
                    showMultiDayTimes
                    step={60}
                />
            </div>
        </main>
    );
}

export default Itinerary;
