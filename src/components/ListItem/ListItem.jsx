import "./ListItem.scss";

function ListItem({ id, item, status, description }) {
    return (
        <li className="list-item">
            <input
                className="list-item__checkbox"
                type="checkbox"
                id={id}
                name="item"
                value={status}
            />
            <label className="list-item__item" htmlFor={id}>
                {item}
            </label>
        </li>
    );
}

export default ListItem;
