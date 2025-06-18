import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Home from "./components/Home.tsx";
import Login from "./pages/LogIn.tsx";
import AddItem from "./pages/AddItem.tsx";
import UpdateItem from "./pages/UpdateItem.tsx";
function App() {
    return (
        <div className="flex h-screen flex-col">
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/update-item" element={<UpdateItem />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
