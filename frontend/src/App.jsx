import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./UserContext";
import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { Layout } from "./components/Layout";
import { Signup } from "./pages/Signup";
import axios from "axios";

axios.defaults.baseURL = " http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={""} />
          <Route path="/account/places" element={""} />
          <Route path="/account/places/new" element={""} />
          <Route path="/account/places/:id" element={""} />
          <Route path="/place/:id" element={""} />
          <Route path="/account/bookings" element={""} />
          <Route path="/account/bookings/:id" element={""} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
