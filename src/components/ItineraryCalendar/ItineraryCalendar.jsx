import "./ItineraryCalendar.scss";
import { Calendar } from "react-big-calendar";
import dayjsLocalizer from "../../utils/dayjsLocalizer.js";

function ItineraryCalendar({ itineraries, defaultDate }) {
    return (
        <div className="calendar">
            <Calendar
                localizer={dayjsLocalizer}
                events={itineraries}
                startAccessor="start"
                endAccessor="end"
                allDayAccessor="allDay"
                defaultDate={defaultDate}
                showMultiDayTimes
                step={60}
            />
        </div>
    );
}

export default ItineraryCalendar;
