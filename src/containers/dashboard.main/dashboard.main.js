import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./../../firebase";

import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import SiteLabelTextField from "components/site.label.textfield/site.label.textfield";
import { IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";


export default function Homepage() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                // read

                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            } else if (!user) {
                props.history.push("/login")
            }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                props.history.push("/login")
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // add
    const writeToDatabase = () => {
        if (todo !== "") {
            const uidd = uid();
            set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
                todo: todo,
                uidd: uidd
            });

            setTodo("");
        }
    };

    // update
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    };

    const handleEditConfirm = () => {
        if (todo !== "") {
            update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
                todo: todo,
                tempUidd: tempUidd
            });

            setTodo("");
            setIsEdit(false);
        }
    };

    // delete
    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    return (
        <div className="homepage">
            <SiteLabelTextField

                type="text"
                placeholder="Add todo..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                endAdornment={<div className="w-100 d-flex justify-content-end">
                    {
                        isEdit ? <IconButton onClick={handleEditConfirm}>
                            <i onClick={handleEditConfirm} className="fa fa-check text-primary" ></i>
                        </IconButton> :
                            <IconButton onClick={writeToDatabase} >
                                <i className="fa fa-plus text-primary" ></i>

                            </IconButton>
                    }
                </div>}
            />

            {todos.map((todo) => (
                <div className="todo d-flex align-items-center justify-content-between mt-1 p-1" style={{ backgroundColor: '#eeeeee' }}>
                    <Typography variant="body1" >{todo.todo}</Typography>
                    <div className="d-flex pt-1">
                        <i

                            onClick={() => handleUpdate(todo)}
                            className="fa fa-edit pl-2 p-0 cursor-pointer"
                        ></i>
                        <i

                            onClick={() => handleDelete(todo.uidd)}
                            className="fa fa-trash pl-2 p-0 cursor-pointer"
                        ></i>
                    </div>
                </div>
            ))}

        </div>
    );
}