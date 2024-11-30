import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import plusIcon from "../../assets/icons/plus.svg";

dayjs.extend(utc);
dayjs.extend(timezone);

function Dashboard() {
    const [remainingTrips, setRemainingTrips] = useState(null);
    const [closestTrip, setClosestTrip] = useState(null);

    const getTrips = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/trips?userId=1`);

            const allTrips = data
                .filter((trip) => dayjs.utc(trip.start_date).local() > dayjs())
                .sort((a, b) => {
                    const dateA = dayjs.utc(a.start_date).local();
                    const dateB = dayjs.utc(b.start_date).local();
                    return dateA.diff(dateB);
                });

            const closestTrip = allTrips[0];

            setClosestTrip(allTrips[0]);

            setRemainingTrips(allTrips.filter((trip) => trip.id !== closestTrip.id));
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    useEffect(() => {
        getTrips();
    }, []);

    if (!closestTrip || !remainingTrips) {
        return <div>Loading dashboard...</div>;
    }

    function countdown(startDate) {
        const today = dayjs();
        const tripStartLocal = dayjs.utc(startDate).local();

        const countdownInMonths = tripStartLocal.diff(today, "month");
        const countdownInDays = tripStartLocal.diff(today, "day");
        const countdownInHours = tripStartLocal.diff(today, "hour") % 24;
        const countdownInMinutes = tripStartLocal.diff(today, "minute") % 60;

        if (countdownInMonths >= 1) return `${countdownInMonths} months`;
        if (countdownInDays > 1) return `${countdownInDays} days`;
        if (countdownInDays <= 1) return `${countdownInHours} hours`;
        if (countdownInHours <= 1) return `${countdownInMinutes} mins`;
    }

    return (
        <main className="dashboard">
            <h1 className="dashboard__title">Hi Sabrina!</h1>
            <div className="dashboard__circle"></div>
            <Link className="dashboard__link dashboard__countdown" to={`/trip/${closestTrip.id}`}>
                <h3 className="dashboard__countdown-title">{closestTrip.trip_name}</h3>
                <h2 className="dashboard__countdown-text">
                    {countdown(closestTrip.start_date)} left
                </h2>
            </Link>
            <section className="dashboard__trips-container">
                <Link className="dashboard__link dashboard__add" to={`/trip/add`}>
                    <img className="dashboard__icon" src={plusIcon} alt="plus icon" />
                </Link>
                <h2 className="dashboard__trips-title">Upcoming Trips</h2>
                <ul className="dashboard__trips-list">
                    {remainingTrips.map((trip) => (
                        <Link className="dashboard__link" key={trip.id} to={`/trip/${trip.id}`}>
                            <li className="dashboard__trips-item">
                                <h4 className="dashboard__trips-name">{trip.trip_name}</h4>
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
