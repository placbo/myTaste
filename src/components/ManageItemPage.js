import React, {useState, useEffect} from "react";
import ItemForm from "./ItemForm";
import {getItem} from "../api/itemApi";
import {saveItems} from "../api/itemApi";
import {toast} from "react-toastify";


function ManageItemPage(props) {

    const [item, setItem] = useState({
            id: null,
            title: ""
        }
    );

    useEffect(() => {
        const id = props.match.params.id; // from the path `/:id`
        if (id) {
            getItem(id).then(_item => setItem(_item));
        }
    }, [props.match.params.id]);

    function handleChange({target}) {
        setItem({
            ...item,
            [target.name]: target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        //if (!formIsValid()) return;
        saveItems(item).then(() => {
            props.history.push("/");
            //toast.success("Course saved.");
            toast.success("Course saved.");
        });
    }

    return (
        <div className="container">
            <ItemForm
                item={item}
                onChange={handleChange}
                onSubmit={handleSubmit}/>
        </div>
    );
}

export default ManageItemPage;
