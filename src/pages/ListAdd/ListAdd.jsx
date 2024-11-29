import "./ListAdd.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import ListForm from "../../components/ListForm/ListForm";

function ListAdd() {
    const navigate = useNavigate();
    const { tripId } = useParams();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        trip_id: tripId,
        list_name: "",
    });

    // axios requests
    const addList = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/lists`, formData);

            console.log(data);

            navigate(`/trip/${tripId}/list/${data.id}`);
        } catch (error) {
            console.error("Error creating list:", error);
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

        console.log(formData);

        if (!validateForm()) {
            return;
        }

        addList();
    };

    // validation
    const validateForm = () => {
        if (!formData.trip_id || !formData.list_name) {
            console.error("Missing required fields");
            return false;
        }

        return true;
    };

    return (
        <>
            <ListForm
                handleSubmit={handleSubmit}
                title="New List"
                formData={formData}
                handleInputChange={handleInputChange}
                tripId={tripId}
            />
        </>
    );
}

export default ListAdd;
