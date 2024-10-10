import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";
import { useEffect } from "react";
import axiosClient from "../../lib/axiosClient";
const DefaultLayout = () => {
    const { user, setUser, token, setToken } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.get("/logout").then(() => {
            setUser(null);
            setToken(null);
        });
    };

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
