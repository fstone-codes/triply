import "./List.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/utils";
import axios from "axios";

function List() {
    const [lists, setLists] = useState(null);
    const { tripId } = useParams();

    const getLists = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/lists`);

            setLists(data);
        } catch (error) {
            console.error("Error fetching lists:", error);
        }
    };

    useEffect(() => {
        getLists();
    }, []);

    if (!lists) {
        return <div>Loading lists...</div>;
    }

    return (
        <ul>
            {lists.map((list) => (
                <Link key={list.id} to={`/trip/${tripId}/list/${list.id}`}>
                    <li>{list.list_name}</li>
                </Link>
            ))}
        </ul>
    );
}

export default List;
