import { useState, useEffect } from "react";
import axiosClient from "../lib/axiosClient";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setIsLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                console.log(data)
                setUsers(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            getUsers();
        });
    };
    return (
        <div className="content-center">
            <div className="w-900">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>Users</h1>
                    <Link className="btn-add" to="/users/new">
                        Add new
                    </Link>
                </div>
                <div className="card animated fadeInDown">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {isLoading && (
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!isLoading && (
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <Link
                                                className="btn-edit"
                                                to={"/users/" + u.id}
                                            >
                                                Edit
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="btn-delete"
                                                onClick={() => onDeleteClick(u)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
