import "./ListDetails.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import CategoryList from "../../components/CategoryList/CategoryList";
import ListEditModal from "../../components/ListEditModal/ListEditModal";
import editIcon from "../../assets/icons/edit.png";

function ListDetails() {
    const [list, setList] = useState(null);
    const [listItems, setListItems] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
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

    if (!listItems) {
        return <div>Loading list...</div>;
    }

    return (
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
            <ListEditModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                formData={formData}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
            />
        </main>
    );
}

export default ListDetails;
