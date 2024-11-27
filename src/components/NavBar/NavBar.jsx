import "./NavBar.scss";
import calendarIcon from "../../assets/icons/calendar.png";
import checkboxIcon from "../../assets/icons/checkbox.png";
import plusIcon from "../../assets/icons/plus.png";
import tripIcon from "../../assets/icons/trip.png";
import { NavLink, matchPath, useLocation } from "react-router-dom";

function NavBar({ onAddClick }) {
    const location = useLocation();
    const tripMatch = matchPath({ path: "/trip/:tripId/*" }, location.pathname);
    const listMatch = matchPath({ path: "/trip/:tripId/list/:listId" }, location.pathname);
    const tripId = tripMatch?.params?.tripId;

    if (!tripId) {
        return null;
    }

    const renderPlusIcon = () => {
        if (listMatch) {
            return (
                <button
                    className="nav__button"
                    onClick={onAddClick}
                    aria-label="Add list item"
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

        return (
            <NavLink className="nav__link nav__link--highlight" to={`/trip/${tripId}/list/add`}>
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
                <img className="nav__icon" src={checkboxIcon} alt="checkbox icon" />
            </NavLink>
            {renderPlusIcon()}
        </nav>
    );
}

export default NavBar;
