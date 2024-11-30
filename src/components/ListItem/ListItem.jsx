import "./ListItem.scss";
import { useState, useRef, useEffect } from "react";
import downIcon from "../../assets/icons/down-chevron.svg";

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
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCheckboxClick = () => {
        setCurrentStatus((prevStatus) => {
            const nextStatus = prevStatus === 1 ? 2 : prevStatus === 2 ? 3 : 1;

            const updatedRequestBody = {
                ...itemBody,
                status: nextStatus,
            };

            editListItem(id, updatedRequestBody);

            return nextStatus;
        });
    };

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.checked = currentStatus === 3;
            checkboxRef.current.indeterminate = currentStatus === 2;
        }
    }, [currentStatus]);

    const handleExpandClick = () => {
        if (isExpanded) {
            setIsExpanded(false);
        } else {
            setIsExpanded(true);
        }
    };

    return (
        <li className={`list-item ${isExpanded ? "list-item--expanded" : ""}`}>
            <div className="list-item__container">
                <input
                    className="list-item__checkbox"
                    type="checkbox"
                    id={id}
                    name="status"
                    value={convertStatusToNumber(status)}
                    ref={checkboxRef}
                    onClick={handleCheckboxClick}
                />
                <div className="list-item__item-container">
                    <label className="list-item__item" htmlFor={id}>
                        {item}
                    </label>
                    <img
                        className={`list-item__icon ${
                            isExpanded ? "list-item__icon--expanded" : ""
                        }`}
                        src={downIcon}
                        alt="down chevron icon"
                        onClick={handleExpandClick}
                    />
                </div>
            </div>
            <div
                className={`list-item__description ${
                    isExpanded ? "list-item__description--expanded" : ""
                }`}
            >
                {description}
            </div>
        </li>
    );
}

export default ListItem;
