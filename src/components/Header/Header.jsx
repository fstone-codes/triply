import "./Header.scss";
import { Link, useLocation, useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import avatar from "../../assets/icons/avatar.svg";
import logoFull from "../../assets/logos/triply-logo-full-light.svg";
import logoIcon from "../../assets/logos/triply-logo-icon-light.svg";

function Header() {
    const location = useLocation();
    const [route, setRoute] = useState(location.pathname);

    useEffect(() => {
        setRoute(location.pathname);
    }, [location]);

    const isTripPage = useMatch("/trip/:tripId");
    const isTripEditPage = useMatch("/trip/:tripId/edit");
    const isTripListPage = useMatch("/trip/:tripId/list");
    const isItineraryAddPage = useMatch("/trip/:tripId/itinerary/add");
    const isListAddPage = useMatch("/trip/:tripId/list/add");

    return (
        <>
            {route === "/" && <></>}
            {(route === "/register" || route === "/login") && (
                <header className="header header--purple">
                    <img className="header__logo-full" src={logoFull} alt="triply logo" />
                </header>
            )}
            {(route === "/dashboard" || isTripPage || isTripListPage) && route !== "/trip/add" && (
                <header className="header header--purple">
                    <Link className="header__logo-container" to="/dashboard">
                        <img className="header__logo-icon" src={logoIcon} alt="triply logo icon" />
                    </Link>
                    <div className="header__avatar-container">
                        <img className="header__avatar" src={avatar} alt="avatar" />
                    </div>
                </header>
            )}
            {(route === "/trip/add" || isTripEditPage || isItineraryAddPage || isListAddPage) && (
                <header className="header header--black">
                    <Link className="header__logo-container" to="/dashboard">
                        <img className="header__logo-icon" src={logoIcon} alt="triply logo icon" />
                    </Link>
                    <div className="header__avatar-container">
                        <img className="header__avatar" src={avatar} alt="avatar" />
                    </div>
                </header>
            )}
            {route !== "/" &&
                route !== "/register" &&
                route !== "/login" &&
                route !== "/dashboard" &&
                route !== "/trip/add" &&
                !isTripPage &&
                !isTripEditPage &&
                !isTripListPage &&
                !isItineraryAddPage &&
                !isListAddPage && (
                    <header className="header header--grey">
                        <Link className="header__logo-container" to="/dashboard">
                            <img
                                className="header__logo-icon"
                                src={logoIcon}
                                alt="triply logo icon"
                            />
                        </Link>
                        <div className="header__avatar-container">
                            <img className="header__avatar" src={avatar} alt="avatar" />
                        </div>
                    </header>
                )}
        </>
    );
}

export default Header;
