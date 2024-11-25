import "./List.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import CategoryList from "../../components/CategoryList/CategoryList";

function List() {
    const [lists, setLists] = useState(null);
    const [listItems, setListItems] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const { tripId, listId } = useParams();

    const getLists = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/lists`);

            setLists(data);
        } catch (error) {
            console.error("Error fetching lists:", error);
        }
    };

    const getListItems = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/lists/${listId}/items/`);

            setListItems(data);

            const filterOnlyCategories = (arrOfObjects) => {
                return arrOfObjects.map((object) => ({
                    id: object.id,
                    category: object.category,
                }));
            };

            const newArray = filterOnlyCategories(data);

            const removeDuplicateCategories = (arrOfObjects) => {
                const storeUniqueCategories = [];

                return arrOfObjects.filter((object) => {
                    if (storeUniqueCategories.includes(object.category)) {
                        return false;
                    }

                    storeUniqueCategories.push(object.category);

                    return true;
                });
            };

            const uniqueCategories = removeDuplicateCategories(newArray);

            setCategoryList(uniqueCategories);
        } catch (error) {
            console.error("Error fetching list items:", error);
        }
    };

    console.log(lists);

    useEffect(() => {
        getLists();
        getListItems();
    }, []);

    if (!lists || !listItems) {
        return <div>Loading list...</div>;
    }

    const foundList = lists.find((list) => list.id == listId);

    return (
        <main className="trip-list">
            <section className="trip-list__container">
                <h1 className="trip-list__title">{foundList.list_name}</h1>
                <ul className="trip-list__list">
                    {categoryList.map((category) => (
                        <CategoryList
                            key={category.id}
                            id={category.id}
                            category={category.category}
                            listItems={listItems}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default List;
