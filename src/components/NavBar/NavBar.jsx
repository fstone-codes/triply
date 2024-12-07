import "./NavBar.scss";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import calendarIcon from "../../assets/icons/calendar.svg";
import checkboxIcon from "../../assets/icons/checkbox.svg";
import plusIcon from "../../assets/icons/plus.svg";
import tripIcon from "../../assets/icons/trip.svg";

function NavBar({ onAddClick }) {
    const location = useLocation();
    const tripGeneralMatch = matchPath(
        { path: "/trip/:tripId/*" },
        location.pathname
    );
    const tripMatch = matchPath({ path: "/trip/:tripId" }, location.pathname);
    const itineraryMatch = matchPath(
        { path: "/trip/:tripId/itinerary" },
        location.pathname
    );
    const itineraryAddMatch = matchPath(
        { path: "/trip/:tripId/itinerary/add" },
        location.pathname
    );
    const listMatch = matchPath(
        { path: "/trip/:tripId/list/:listId" },
        location.pathname
    );
    const tripId = tripGeneralMatch?.params?.tripId;

    if (!tripId) {
        return null;
    }

    const renderPlusIcon = () => {
        if (listMatch) {
            return (
                <button
                    className="nav__button"
                    onClick={onAddClick}
                    type="button"
                >
                    <img
                        className="nav__icon nav__icon--small nav__icon--highlight"
                        src={plusIcon}
                        alt="plus icon"
                    />
                </button>
            );
        }

        if (tripMatch || itineraryMatch || itineraryAddMatch) {
            return (
                <NavLink
                    className="nav__link nav__link--highlight"
                    to={`/trip/${tripId}/itinerary/add`}
                >
                    <img
                        className="nav__icon nav__icon--small nav__icon--highlight"
                        src={plusIcon}
                        alt="plus icon"
                    />
                </NavLink>
            );
        }

        return (
            <NavLink
                className="nav__link nav__link--highlight"
                to={`/trip/${tripId}/list/add`}
            >
                <img
                    className="nav__icon nav__icon--small nav__icon--highlight"
                    src={plusIcon}
                    alt="plus icon"
                />
            </NavLink>
        );
    };

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
                <img
                    className="nav__icon  nav__icon--small"
                    src={checkboxIcon}
                    alt="checkbox icon"
                />
            </NavLink>
            {renderPlusIcon()}
        </nav>
    );
}

export default NavBar;
