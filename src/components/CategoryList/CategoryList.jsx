import "./CategoryList.scss";
import ListItem from "../ListItem/ListItem";

function CategoryList({ category, listItems, convertStatusToNumber, editListItem }) {
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
                            itemBody={item}
                            convertStatusToNumber={convertStatusToNumber}
                            editListItem={editListItem}
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
