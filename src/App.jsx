import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Itinerary from "./pages/Itinerary/Itinerary";
import ItineraryAdd from "./pages/ItineraryAdd/ItineraryAdd";
import ItineraryEdit from "./pages/ItineraryEdit/ItineraryEdit";
import List from "./pages/List/List";
import ListAdd from "./pages/ListAdd/ListAdd";
import ListDetails from "./pages/ListDetails/ListDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TripAdd from "./pages/TripAdd/TripAdd";
import TripDetails from "./pages/TripDetails/TripDetails";
import TripEdit from "./pages/TripEdit/TripEdit";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/trip/add" element={<TripAdd />} />
                <Route path="/trip/:tripId" element={<TripDetails />} />
                <Route path="/trip/:tripId/edit" element={<TripEdit />} />
                <Route path="/trip/:tripId/itinerary" element={<Itinerary />} />
                <Route path="/trip/:tripId/itinerary/add" element={<ItineraryAdd />} />
                <Route
                    path="/trip/:tripId/itinerary/:itineraryId/edit"
                    element={<ItineraryEdit />}
                />
                <Route path="/trip/:tripId/list" element={<List />} />
                <Route path="/trip/:tripId/list/add" element={<ListAdd />} />
                <Route path="/trip/:tripId/list/:listId" element={<ListDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
