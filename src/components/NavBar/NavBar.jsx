import "./NavBar.scss";
import calendarIcon from "../../assets/icons/calendar.png";
import checkboxIcon from "../../assets/icons/checkbox.png";
import plusIcon from "../../assets/icons/plus.png";
import tripIcon from "../../assets/icons/trip.png";
import { NavLink, matchPath, useLocation } from "react-router-dom";

function NavBar() {
    const location = useLocation();

    // List of routes where NavBar should not appear
    const excludedRoutes = ["/", "/register", "/login", "/dashboard"];

    const tripMatch = matchPath({ path: "/trip/:tripId/*" }, location.pathname);
    const tripId = tripMatch?.params?.tripId;

    // Check if the current route matches an excluded route
    if (excludedRoutes.includes(location.pathname)) {
        return null;
    }

    let plusLink = `/trip/${tripId}/edit`; // Default to editing trip details

    if (location.pathname.includes("/itinerary")) {
        plusLink = `/trip/${tripId}/itinerary/add`;
    } else if (location.pathname.includes("/list")) {
        plusLink = `/trip/${tripId}/list/add`;
    }

    return (
        <nav className="nav">
            <NavLink className="nav__link" to={`/trip/${tripId}`}>
                <img className="nav__icon" src={tripIcon} alt="trip icon" />
            </NavLink>
            <NavLink className="nav__link" to={`/trip/${tripId}/itinerary`}>
                <img
                    className="nav__icon nav__icon--small"
                    src={calendarIcon}
                    alt="calendar icon"
                />
            </NavLink>
            <NavLink className="nav__link" to={`/trip/${tripId}/list`}>
                <img className="nav__icon" src={checkboxIcon} alt="checkbox icon" />
            </NavLink>
            <NavLink className="nav__link nav__link--highlight" to={plusLink}>
                <img
                    className="nav__icon nav__icon--small nav__icon--highlight"
                    src={plusIcon}
                    alt="plus icon"
                />
            </NavLink>
        </nav>
    );
}

export default NavBar;
