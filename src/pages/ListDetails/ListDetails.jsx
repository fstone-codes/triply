import "./ListDetails.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/utils";
import CategoryList from "../../components/CategoryList/CategoryList";
import ListEditModal from "../../components/ListEditModal/ListEditModal";
import ListItemAddModal from "../../components/ListItemAddModal/ListItemAddModal";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import editIcon from "../../assets/icons/edit.png";

function ListDetails() {
    const [list, setList] = useState(null);
    const [listItems, setListItems] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const { tripId, listId } = useParams();

    const getList = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/lists/${listId}`);

            setList(data);

            setFormData({
                trip_id: data.trip_id,
                list_name: data.list_name,
            });
        } catch (error) {
            console.error("Error fetching list:", error);
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

    useEffect(() => {
        getList();
        getListItems();
    }, []);

    // ============================
    // edit list modal below
    // ============================

    const [isOpen, setIsOpen] = useState(false);

    const handleModalClick = () => {
        setIsOpen(true);
    };

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        trip_id: tripId,
        list_name: "",
    });

    // axios requests
    const editList = async () => {
        try {
            await axios.put(`${baseUrl}/api/lists/${listId}`, formData);

            getList();
        } catch (error) {
            console.error("Error modifying list:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(() => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!validateForm()) {
            return;
        }

        editList();

        setIsOpen(false);
    };

    // validation
    const validateForm = () => {
        if (!formData.trip_id || !formData.list_name) {
            console.error("Missing required fields");
            return false;
        }

        return true;
    };

    // ============================
    // add list item below
    // ============================

    const [listItem, setListItem] = useState({
        list_id: { listId },
        item: "",
        description: "",
        status: 1,
        category: "",
    });

    const addListItem = async () => {
        try {
            await axios.post(`${baseUrl}/api/lists/${listId}`, listItem);

            return true;
        } catch (error) {
            console.error("Error creating list item:", error);
        }
    };

    const handleListItemInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(() => ({
            ...listItem,
            [name]: value,
        }));
    };

    const handleListItemSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!validateListItemForm()) {
            return;
        }

        addListItem();

        setIsOpen(false);
    };

    // validation
    const validateListItemForm = () => {
        if (
            !listItem.list_id ||
            !listItem.item ||
            !listItem.category ||
            listItem.status === undefined
        ) {
            console.error("Missing required fields");
            return false;
        }

        return true;
    };

    // dropdown icon on right of list item
    // dropdown flex on full list item
    // need item text to have overflow: scroll
    // when dropdown item is clicked - shows more content
    // edit icon should do more than just the name - open modal to edit the list item. Bottom wi
    // make edit modal full page and
    // use put request with edit modal that also lists categories
    // SHOW ALL ITEMS IN LIST AND SELECT CATEGORY IN DROPDOWN
    // DROPDOWN OF CATEGORIES instead of them writing catgeory
    // each list item, description, category drop down list
    // map each name, filter out the unique categories

    // edit form
    // list name edit
    // map through all items and display options for editing (w/ name, item, category inputs). edit form will start with defaults
    // show everything at once

    // add list item its own modal with the basic inputs
    // if they can add categories, need to update category state and make get request again

    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleAddModalClick = () => {
        setIsAddOpen(true);
    };

    // guarding
    if (!listItems) {
        return <div>Loading list...</div>;
    }

    return (
        <>
            <main className="trip-list">
                <section className="trip-list__container">
                    <div className="trip-list__title-container">
                        <h1 className="trip-list__title">{list.list_name}</h1>
                        <img
                            className="trip-list__icon"
                            src={editIcon}
                            alt="edit icon"
                            onClick={handleModalClick}
                        />
                    </div>
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
                <ListItemAddModal
                    isOpen={isAddOpen}
                    setIsOpen={setIsAddOpen}
                    listItem={listItem}
                    handleListItemSubmit={handleListItemSubmit}
                    handleListItemInputChange={handleListItemInputChange}
                />
                <ListEditModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    formData={formData}
                    listItems={listItems}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                />
            </main>
            <NavBar onAddClick={handleAddModalClick} />
        </>
    );
}

export default ListDetails;
