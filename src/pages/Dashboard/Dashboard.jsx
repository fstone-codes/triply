import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import plusIcon from "../../assets/icons/plus.svg";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import setBodyColor from "../../utils/setBackgroundColor.js";

dayjs.extend(utc);
dayjs.extend(timezone);

function Dashboard() {
    const [remainingTrips, setRemainingTrips] = useState(null);
    const [closestTrip, setClosestTrip] = useState(null);

    setBodyColor("#cfcaec");

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

            setRemainingTrips(
                allTrips.filter((trip) => trip.id !== closestTrip.id)
            );
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    useEffect(() => {
        getTrips();
    }, []);

    if (!closestTrip || !remainingTrips) {
        return (
            <div className="loader loader--purple">
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

    function countdown(startDate) {
        const today = dayjs();
        const tripStartLocal = dayjs.utc(startDate).local();

        const countdownInMonths = tripStartLocal.diff(today, "month");
        const countdownInDays = tripStartLocal.diff(today, "day");
        const countdownInHours = tripStartLocal.diff(today, "hour");
        const countdownInMinutes = tripStartLocal.diff(today, "minute");

        return countdownInMonths > 1
            ? `${countdownInMonths} months`
            : countdownInMonths === 1
            ? `${countdownInMonths} month`
            : countdownInMonths < 1 && countdownInDays !== 1
            ? `${countdownInDays} days`
            : countdownInMonths < 1 && countdownInDays === 1
            ? `${countdownInDays} day`
            : countdownInDays < 1 && countdownInHours !== 1
            ? `${countdownInHours} hours`
            : countdownInDays < 1 && countdownInHours === 1
            ? `${countdownInHours} hour`
            : countdownInHours < 1 && countdownInMinutes !== 1
            ? `${countdownInMinutes} mins`
            : countdownInHours < 1 && countdownInMinutes === 1
            ? `${countdownInMinutes} min`
            : "Today!";
    }

    return (
        <main className="dashboard">
            <h1 className="dashboard__title">Hi Sabrina!</h1>
            <div className="dashboard__circle dashboard__circle--a"></div>
            <div className="dashboard__circle dashboard__circle--b"></div>
            <Link
                className="dashboard__link dashboard__countdown"
                to={`/trip/${closestTrip.id}`}
            >
                <h3 className="dashboard__countdown-title">
                    {closestTrip.trip_name}
                </h3>
                <h2 className="dashboard__countdown-text">
                    {countdown(closestTrip.start_date)} away
                </h2>
            </Link>
            <section className="dashboard__trips-container">
                <Link
                    className="dashboard__link dashboard__add dashboard__add--float"
                    to={`/trip/add`}
                >
                    <img
                        className="dashboard__icon"
                        src={plusIcon}
                        alt="plus icon"
                    />
                </Link>
                <div className="dashboard__container">
                    <h2 className="dashboard__trips-title">Upcoming Trips</h2>
                    <Link
                        className="dashboard__link dashboard__add dashboard__add--title"
                        to={`/trip/add`}
                    >
                        <img
                            className="dashboard__icon"
                            src={plusIcon}
                            alt="plus icon"
                        />
                    </Link>
                </div>
                <ul className="dashboard__trips-list">
                    {remainingTrips.map((trip) => (
                        <Link
                            className="dashboard__link"
                            key={trip.id}
                            to={`/trip/${trip.id}`}
                        >
                            <li className="dashboard__trips-item">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <h4 className="dashboard__trips-name">
                                    {trip.trip_name}
                                </h4>
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
