import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Link } from "react-router-dom";

// Add plugins to Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

function Dashboard() {
    const [trips, setTrips] = useState(null);
    const [closestTrip, setClosestTrip] = useState("No future trips");

    const getTrips = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/trips?userId=1`);

            setTrips(data);

            // const nearestTrip = trips.reduce((closest, trip) => {
            //     const tripDate = dayjs(trip.startDate);
            //     const difference = tripDate.diff(now);

            //     if (difference < 0) return closest;

            //     if (!closest || difference < dayjs(closest.startDate).diff(now)) {
            //         return trip;
            //     }

            //     return closest;
            // }, null);

            // if (nearestTrip) {
            //     setClosestTrip(nearestTrip);
            // }
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    useEffect(() => {
        getTrips();
    }, []);

    if (!trips) {
        return <div>Loading trips...</div>;
    }

    function countdown(startDate) {
        const today = dayjs();
        const tripStartLocal = dayjs.utc(startDate).local();

        const countdownInDays = tripStartLocal.diff(today, "day");
        const countdownInHours = tripStartLocal.diff(today, "hour") % 24;
        const countdownInMinutes = tripStartLocal.diff(today, "minute") % 60;

        if (countdownInDays > 1) return `${countdownInDays} days`;
        if (countdownInDays <= 1) return `${countdownInHours} hours`;
        if (countdownInHours <= 1) return `${countdownInMinutes} mins`;
    }

    console.log(closestTrip);

    return (
        <main className="dashboard">
            <h1 className="dashboard__title">Hi Tiffany!</h1>
            <div className="dashboard__circle"></div>
            <article className="dashboard__countdown">{closestTrip}</article>
            <section className="dashboard__trips-container">
                <h2 className="dashboard__trips-title">Upcoming Trips</h2>
                <ul className="dashboard__trips-list">
                    {trips.map((trip) => (
                        <Link className="dashboard__link" to={`/trip/${trip.id}`}>
                            <li className="dashboard__trips-item" key={trip.id}>
                                <h3 className="dashboard__trips-name">{trip.trip_name}</h3>
                                <p className="dashboard__trips-text">
                                    {countdown(trip.start_date)}
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Dashboard;
