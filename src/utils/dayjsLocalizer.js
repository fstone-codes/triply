import dayjs from "dayjs";
import { dayjsLocalizer } from "react-big-calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/en";

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(timezone);

const djLocalizer = dayjsLocalizer(dayjs);

export default djLocalizer;
