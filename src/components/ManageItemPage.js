import React, {useEffect, useState} from "react";
import ItemForm from "./ItemForm";
import {getItem, saveItems} from "../api/itemApi";
//import {toast} from "react-toastify";
const axios = require("axios");

function ManageItemPage(props) {

    const [item, setItem] = useState({
            _id: null,
            title: ""
        }
    );
    const [isUploading, setIsUploading] = useState(false);

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

    let formData = new FormData();


    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        setIsUploading(true); //TODO: doesnt work. why ?
        files.forEach((file, i) => {
            formData.append("image", file);
            console.log("ready to upload file: " + file.name);
            console.log("isUploading:  " + isUploading);
        });
        const url = process.env.REACT_APP_API_URL + "mytaste/upload/";

        formData.append("testkey", "test");
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(images => {
                console.log(images);
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
        // console.log(event.target);
        // console.log(event.target.title);
        // console.log(event.target.files);

        //if (!formIsValid()) return;

    // saveItems(item).then(() => {
        //     props.history.push("/");
        //     toast.success("Saved.");
        // });

        // formData.append('testkey', "test");
        //
        // const url = process.env.REACT_APP_API_URL + "mytaste/upload/";
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        // axios.post(url,formData,config)
        //     .then((response) => {
        //         alert("The file is successfully uploaded");
        //     }).catch((error) => {
        // });


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
