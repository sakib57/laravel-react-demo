import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    
        console.log(data)
                    setLoading(false);
                    setUsers(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="content-center">
            <div className="w-500">
                {user.id && <h1>Update User: {user.name}</h1>}
                {!user.id && <h1>New User</h1>}
                <div className="card animated fadeInDown">
                    {loading && <div className="text-center">Loading...</div>}
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    {!loading && (
                        <form onSubmit={onSubmit}>
                            <input
                                value={user.name}
                                onChange={(ev) =>
                                    setUsers({ ...user, name: ev.target.value })
                                }
                                placeholder="Name"
                            />
                            <input
                                value={user.email}
                                onChange={(ev) =>
                                    setUsers({
                                        ...user,
                                        email: ev.target.value,
                                    })
                                }
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                onChange={(ev) =>
                                    setUsers({
                                        ...user,
                                        password: ev.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                            <button className="btn">Save</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserForm;
