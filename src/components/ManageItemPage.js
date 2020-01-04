import React, {useEffect, useState} from "react";
import ItemForm from "./ItemForm";
import {getItem} from "../api/itemApi";
import {toast} from "react-toastify";

function ManageItemPage(props) {

    const [item, setItem] = useState({
            _id: null,
            title: ""
        }
    );
    //const [isUploading, setIsUploading] = useState(false);
    const [files, setFiles] = useState([]);

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

    function handleFileChange(e) {
        setFiles(Array.from(e.target.files));
        //TODO: Draw preview;
    }

    function handleSubmit(event) {
        //if (!formIsValid()) return;
        event.preventDefault();
        let formData = new FormData();
        files.forEach((file, i) => {
            formData.append("image", file);
        });
        Object.keys(item).forEach(function (key) {
            (key !== "_id") && formData.append(key, item[key]);
        });
        const url = "/mytasteapi/upload/";
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(resultItem => {
                console.log(resultItem);
                props.history.push("/");
                toast.success(`${resultItem.title} Saved.`);
            });

    }


return (
    <div className="container">
        <ItemForm
            item={item}
            onChange={handleChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}/>
    </div>
);
}

export default ManageItemPage;
