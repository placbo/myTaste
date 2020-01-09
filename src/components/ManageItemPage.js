import React, {useEffect, useState} from "react";
import ItemForm from "./ItemForm";
import {getItem, saveItem} from "../api/itemApi";
import {toast} from "react-toastify";

function ManageItemPage(props) {

    const [item, setItem] = useState({
            _id: null,
            title: "test"
        }
    );

    const [per, setPer] = useState([]);

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

    function perLogging(msg) {
        setPer(oldArray => [...oldArray, msg + " | "]);
    }


    function handleFileChange(e) {

        perLogging("filechange triggered");

        console.log("handles filechange");
        const files = Array.from(e.target.files);
        const UPLOAD_IMAGE_URL = process.env.REACT_APP_MYTASTE_API_HOST + "/mytasteapi/upload/";

        perLogging("url : " + UPLOAD_IMAGE_URL);

        const formData = new FormData();
        files.forEach((file, i) => {
            formData.append("image", file);
            perLogging("ready to upload file : ");
            perLogging(file.name);
        });

        //TODO: sjekk for 1mb-grense på filer (status 413)

        fetch(UPLOAD_IMAGE_URL, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "mode" : "no-cors",
            },
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                perLogging(result);
                console.log(result);
                setItem({
                    ...item,
                    'image': result
                });
            })
            .catch(function(err) {
                perLogging(err.status);
                perLogging(err);
                console.log(err);
            });

    }

    function handleSubmit(event) {
        //if (!formIsValid()) return;

        perLogging("submitting!!!");
        event.preventDefault();
//TODO: sjekk at image er med. henger ? print save-item til logg. noen gang uten bilde...
        saveItem(item).then(() => {
            props.history.push("/");
            toast.success(`${item.title} Saved.`);
        });
    }


    return (
        <div className="container">
            <div >{per}</div>
            <ItemForm
                item={item}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}/>
        </div>
    );
}

export default ManageItemPage;
