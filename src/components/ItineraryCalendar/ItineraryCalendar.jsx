import "./ItineraryCalendar.scss";
import { Calendar } from "react-big-calendar";
import djLocalizer from "../../utils/dayjsLocalizer.js";

function ItineraryCalendar({ itineraries, defaultDate }) {
    return (
        <div className="calendar">
            <Calendar
                localizer={djLocalizer}
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
