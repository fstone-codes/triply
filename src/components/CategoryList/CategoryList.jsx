import "./CategoryList.scss";
import ListItem from "../ListItem/ListItem";

function CategoryList({ id, category, listItems }) {
    console.log(listItems, category);

    const filteredItems = listItems.filter((item) => item.category === category);

    console.log(filteredItems);

    return (
        <li className="category">
            {category}
            <ul className="category__list">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ListItem
                            key={item.id}
                            id={item.id}
                            item={item.item}
                            status={item.status}
                            description={item.description}
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
