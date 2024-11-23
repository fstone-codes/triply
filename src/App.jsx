import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Itinerary from "./pages/Itinerary/Itinerary";
import List from "./pages/List/List";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TripDetails from "./pages/TripDetails/TripDetails";
import TripSetup from "./pages/TripSetup/TripSetup";
import Header from "./components/Header/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={Home} />
                <Route path="/register" element={Register} />
                <Route path="/login" element={Login} />
                <Route path="/dashboard" element={Dashboard} />
                <Route path="/trip/setup" element={<TripSetup />} />
                <Route path="/trip/:tripId" element={TripDetails} />
                <Route path="/itinerary/:tripId" element={Itinerary} />
                <Route path="/list/:tripId" element={List} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
