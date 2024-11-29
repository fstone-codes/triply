import "./TripDetails.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import editIcon from "../../assets/icons/edit.png";
import dayjs from "dayjs";
import NavBar from "../../components/NavBar/NavBar";

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
        return <div>Loading trip details...</div>;
    }

    return (
        <>
            <main className="trip-details">
                <section className="trip-details__container">
                    <div className="trip-details__title-container">
                        <h1 className="trip-details__title">{trip.trip_name}</h1>
                        <Link className="trip-details__link" to={`/trip/${tripId}/edit`}>
                            <img className="trip-details__icon" src={editIcon} alt="edit icon" />
                        </Link>
                    </div>
                    <div className="trip-details__content-container">
                        <h2 className="trip-details__label">Destination</h2>
                        <p className="trip-details__text">{trip.destination}</p>
                    </div>
                    <div className="trip-details__content-container">
                        <h2 className="trip-details__label">Date</h2>
                        <p className="trip-details__text">
                            {dayjs(trip.start_date).format("MMMM DD, YYYY")} -{" "}
                            {dayjs(trip.end_date).format("MMMM DD, YYYY")}
                        </p>
                    </div>
                </section>
            </main>
            <NavBar />
        </>
    );
}

export default TripDetails;
