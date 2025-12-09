import { useNavigate } from "react-router"
import { useContext } from "react"
import UserContext from "../contexts/UserContext.jsx";

export default function Logout() {
    const { logoutHandler } = useContext(UserContext);
    const navigate = useNavigate();
    logoutHandler()
        .then(() => {
            console.log('Logged out successfully');
            navigate('/');
        })
        .catch((error) => {
            navigate('/');
            alert('Logout failed:' + error.message);
        });

    return null;

}