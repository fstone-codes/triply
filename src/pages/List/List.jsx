import "./List.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/utils";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";

function List() {
    const [lists, setLists] = useState(null);
    const { tripId } = useParams();

    const getLists = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/lists`);

            const sortedData = data
                .filter((list) => list.trip_id == tripId)
                .sort((a, b) => a.list_name.localeCompare(b.list_name));

            setLists(sortedData);
        } catch (error) {
            console.error("Error fetching lists:", error);
        }
    };

    useEffect(() => {
        getLists();
    }, [tripId]);

    if (!lists) {
        return (
            <div className="loader loader--purple">
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
            <main className="list-lists-main">
                <section className="list-lists-main__container">
                    <h1 className="list-lists-main__title">Lists</h1>
                    <ul className="list-lists">
                        {lists.map((list) => (
                            <Link
                                className="list-lists__link"
                                key={list.id}
                                to={`/trip/${tripId}/list/${list.id}`}
                            >
                                <li className="list-lists__item">
                                    {list.list_name}
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </section>
            </main>
            <NavBar />
        </>
    );
}

export default List;
