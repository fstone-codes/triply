import { useState, useRef, useEffect } from "react";
import "./ListItem.scss";

function ListItem({
    id,
    item,
    status,
    description,
    convertStatusToNumber,
    editListItem,
    itemBody,
}) {
    const checkboxRef = useRef(null);
    const [currentStatus, setCurrentStatus] = useState(convertStatusToNumber(status));

    const handleCheckboxClick = () => {
        setCurrentStatus((prevStatus) => {
            const nextStatus = prevStatus === 1 ? 2 : prevStatus === 2 ? 3 : 1; // Cycle between 1, 2, and 3

            const updatedRequestBody = {
                ...itemBody,
                status: nextStatus, // Use the next status directly here
            };

            // Call editListItem with the updated status
            editListItem(id, updatedRequestBody);

            return nextStatus; // This ensures the state is updated correctly
        });
    };

    useEffect(() => {
        if (checkboxRef.current) {
            // Only run if the checkbox is available
            checkboxRef.current.checked = currentStatus === 3; // Checked for status 3
            checkboxRef.current.indeterminate = currentStatus === 2; // Indeterminate for status 2
        }
    }, [currentStatus]);

    return (
        <li className="list-item">
            <input
                className="list-item__checkbox"
                type="checkbox"
                id={id}
                name="status"
                value={convertStatusToNumber(status)}
                ref={checkboxRef}
                onClick={handleCheckboxClick}
            />
            <label className="list-item__item" htmlFor={id}>
                {item}
            </label>
        </li>
    );
}

export default ListItem;
