import "./Itinerary.scss";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/utils.js";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import ItineraryCalendar from "../../components/ItineraryCalendar/ItineraryCalendar.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";

function Itinerary() {
    const [currentTrip, setCurrentTrip] = useState(null);
    const [itineraries, setItineraries] = useState(null);
    const { tripId } = useParams();

    const getSingleTrip = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/trips/${tripId}`);

            const parsedTrip = {
                ...data,
                start_date: dayjs(data.start_date).toDate(),
                end_date: dayjs(data.end_date).toDate(),
            };

            setCurrentTrip(parsedTrip);
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
                allDay: event.all_day,
            }));

            const filteredData = parsedEvents.filter((itinerary) => itinerary.trip_id == tripId);

            setItineraries(filteredData);
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
        return (
            <div className="loader loader--grey">
                <div className="loader__default">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <main className="itinerary">
                <ItineraryCalendar itineraries={itineraries} defaultDate={currentTrip.start_date} />
            </main>
            <NavBar />
        </>
    );
}

export default Itinerary;
