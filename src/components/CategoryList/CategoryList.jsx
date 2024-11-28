import "./CategoryList.scss";
import ListItem from "../ListItem/ListItem";

function CategoryList({ id, category, listItems, convertStatusToNumber, editListItem }) {
    const filteredItems = listItems.filter((item) => item.category === category);

    return (
        <li className="category">
            <h2 className="category__title">{category}</h2>
            <ul className="category__list">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ListItem
                            key={item.id}
                            id={item.id}
                            item={item.item}
                            status={item.status}
                            description={item.description}
                            convertStatusToNumber={convertStatusToNumber}
                            editListItem={editListItem}
                            itemBody={item}
                        />
                    ))
                ) : (
                    <p className="category__text">No items in this category.</p>
                )}
            </ul>
        </li>
    );
}

export default CategoryList;
