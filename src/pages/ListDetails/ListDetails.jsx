import "./ListDetails.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/utils";
import CategoryList from "../../components/CategoryList/CategoryList";
import ListEditModal from "../../components/ListEditModal/ListEditModal";
import ListItemAddModal from "../../components/ListItemAddModal/ListItemAddModal";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import editIcon from "../../assets/icons/edit.svg";

function ListDetails() {
    const [list, setList] = useState(null);
    const [listItems, setListItems] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const { tripId, listId } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [useEditModal, setUseEditModal] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const [formData, setFormData] = useState({
        trip_id: tripId,
        list_name: "",
    });

    const [newListItem, setNewListItem] = useState({
        list_id: listId,
        item: "",
        description: "",
        status: 1,
        category: "",
    });

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

    const editList = async () => {
        try {
            await axios.put(`${baseUrl}/api/lists/${listId}`, formData);

            getList();
        } catch (error) {
            console.error("Error modifying list:", error);
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

    const addListItem = async () => {
        try {
            await axios.post(`${baseUrl}/api/lists/${listId}/items`, newListItem);
            getListItems();

            // Reset the newListItem state after successful addition
            setNewListItem({
                list_id: listId,
                item: "",
                description: "",
                status: 1,
                category: "",
            });
        } catch (error) {
            console.error("Error adding list item:", error);
        }
    };

    const editListItem = async (id, itemBody) => {
        try {
            if (itemBody) {
                const { created_at, updated_at, ...itemToUpdate } = itemBody;
                await axios.put(`${baseUrl}/api/lists/${listId}/items/${id}`, itemToUpdate);

                getListItems();
            } else {
                const selectedItem = listItems.find((item) => item.id === selectedItemId);

                const { created_at, updated_at, ...itemToUpdate } = selectedItem;

                await axios.put(
                    `${baseUrl}/api/lists/${listId}/items/${selectedItemId}`,
                    itemToUpdate
                );

                getListItems();
            }
        } catch (error) {
            console.error("Error modifying list item:", error);
        }
    };

    useEffect(() => {
        getList();
        getListItems();
    }, []);

    const handleModalClick = () => {
        setIsOpen(true);
        setUseEditModal(true);
    };

    const handleEditModalClick = (id) => {
        setSelectedItemId(id);
    };

    const handleAddModalClick = () => {
        setIsAddOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "list_name") {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else if (useEditModal) {
            // Handle edit modal input changes
            setListItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === selectedItemId
                        ? {
                              ...item,
                              [name]: name === "status" ? convertStatusToNumber(value) : value,
                          }
                        : item
                )
            );
        } else {
            // Handle add modal input changes
            setNewListItem({
                ...newListItem,
                [name]: name === "status" ? convertStatusToNumber(value) : value,
            });
        }
    };

    // Add this helper function
    const convertStatusToNumber = (status) => {
        switch (status) {
            case "Not Started":
                return 1;
            case "In Progress":
                return 2;
            case "Complete":
                return 3;
            default:
                return parseInt(status) || 1; // fallback to number if already a number string
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!validateForm()) {
            return;
        }

        if (useEditModal) {
            editList();
            editListItem();
            setIsOpen(false);
        } else {
            addListItem();
            setIsAddOpen(false);
        }
    };

    // validation
    const validateForm = () => {
        if (useEditModal) {
            if (!formData.trip_id || !formData.list_name) {
                console.error("Missing required fields");
                return false;
            }

            const selectedItem = listItems.find((item) => item.id === selectedItemId);
            if (
                !selectedItem.list_id ||
                !selectedItem.item ||
                !selectedItem.category ||
                selectedItem.status === undefined
            ) {
                console.error("Missing required fields");
                return false;
            }
        } else {
            // Validate add modal form
            if (
                !newListItem.list_id ||
                !newListItem.item ||
                !newListItem.category ||
                newListItem.status === undefined
            ) {
                console.error("Missing required fields");
                return false;
            }
        }

        return true;
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
                                category={category.category}
                                listItems={listItems}
                                convertStatusToNumber={convertStatusToNumber}
                                editListItem={editListItem}
                            />
                        ))}
                    </ul>
                </section>
                <ListItemAddModal
                    isOpen={isAddOpen}
                    setIsOpen={setIsAddOpen}
                    newListItem={newListItem}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    convertStatusToNumber={convertStatusToNumber}
                />
                <ListEditModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    useEditModal={useEditModal}
                    formData={formData}
                    handleClick={handleEditModalClick}
                    listItems={listItems}
                    categoryList={categoryList}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    convertStatusToNumber={convertStatusToNumber}
                />
            </main>
            <NavBar onAddClick={handleAddModalClick} />
        </>
    );
}

export default ListDetails;
