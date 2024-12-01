import "./ListDetails.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import editIcon from "../../assets/icons/edit.svg";
import CategoryList from "../../components/CategoryList/CategoryList";
import ListEditModal from "../../components/ListEditModal/ListEditModal";
import ListItemAddModal from "../../components/ListItemAddModal/ListItemAddModal";
import NavBar from "../../components/NavBar/NavBar";

function ListDetails() {
    const [list, setList] = useState(null);
    const [listItems, setListItems] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [useEditModal, setUseEditModal] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const { tripId, listId } = useParams();

    const [listData, setListData] = useState({
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

            setListData({
                id: data.id,
                trip_id: data.trip_id,
                list_name: data.list_name,
            });
        } catch (error) {
            console.error("Error fetching list:", error);
        }
    };

    const editList = async () => {
        try {
            await axios.put(`${baseUrl}/api/lists/${listId}`, listData);

            getList();
        } catch (error) {
            console.error("Error modifying list:", error);
        }
    };

    const getListItems = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/lists/${listId}/items/`);

            setListItems(data);

            const uniqueCategories = data
                .filter(
                    (obj, index, self) =>
                        index === self.findIndex((x) => x.category === obj.category)
                )
                .map((obj) => ({ id: obj.id, category: obj.category }));

            setCategoryList(uniqueCategories);
        } catch (error) {
            console.error("Error fetching list items:", error);
        }
    };

    const addListItem = async () => {
        try {
            await axios.post(`${baseUrl}/api/lists/${listId}/items`, newListItem);

            getListItems();

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

    const handleModalClose = () => {
        setIsOpen(false);
        setUseEditModal(false);
        setSelectedItemId(null);
        setNewListItem({
            list_id: listId,
            item: "",
            description: "",
            status: 1,
            category: "",
        });
    };

    const handleEditModalClick = (id) => {
        setSelectedItemId(id);
    };

    const handleAddModalClick = () => {
        setUseEditModal(false);
        setSelectedItemId(null);
        setIsAddOpen(true);
        setNewListItem({
            list_id: listId,
            item: "",
            description: "",
            status: 1,
            category: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "list_name") {
            setListData({
                ...listData,
                [name]: value,
            });
        } else if (isOpen && useEditModal && selectedItemId) {
            // handle edit modal input changes
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
        } else if (isAddOpen) {
            // handle add modal input changes
            setNewListItem({
                ...newListItem,
                [name]: name === "status" ? convertStatusToNumber(value) : value,
            });
        }
    };

    const convertStatusToNumber = (status) => {
        switch (status) {
            case "Not Started":
                return 1;
            case "In Progress":
                return 2;
            case "Complete":
                return 3;
            default:
                return parseInt(status) || 1;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!validateForm()) {
            return;
        }

        if (useEditModal) {
            await editList();

            if (selectedItemId) {
                await editListItem();
            }

            setIsOpen(false);
        } else {
            await addListItem();
            setIsAddOpen(false);
        }
    };

    const validateForm = () => {
        if (useEditModal) {
            if (!listData.trip_id || !listData.list_name) {
                console.error("Missing required fields");
                return false;
            }

            if (selectedItemId) {
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
            }
        } else {
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

    if (!listItems || !list || !categoryList) {
        return (
            <div className="loader loader--grey">
                <div className="loader__default">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
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
                    handleModalClose={handleModalClose}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    convertStatusToNumber={convertStatusToNumber}
                />
                <ListEditModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    useEditModal={useEditModal}
                    listData={listData}
                    listItems={listItems}
                    categoryList={categoryList}
                    handleClick={handleEditModalClick}
                    handleModalClose={handleModalClose}
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
