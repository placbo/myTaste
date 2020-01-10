import React, {useEffect, useState} from "react";
import ItemForm from "./ItemForm";
import {getItem, saveItem} from "../api/itemApi";
import {toast} from "react-toastify";

const UPLOAD_IMAGE_URL = process.env.REACT_APP_MYTASTE_API_HOST + "/mytasteapi/upload/";

function ManageItemPage(props) {

    const [item, setItem] = useState({
            _id: null,
            title: "test",
            image: null
        }
    );

    const [onScreenLog, setOnScreenLog] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const id = props.match.params.id; // from the path `/:id`
        if (id) {
            getItem(id).then(_item => setItem(_item));
        }
    }, [props.match.params.id]);


    useEffect(() => {
        addToOnScreenLog(JSON.stringify(item));
    }, [item]);


    function handleFormChange({target}) {
        setItem({
            ...item,
            [target.name]: target.value
        });
    }

    function addToOnScreenLog(msg) {
        //setOnScreenLog(oldArray => [...oldArray, msg]);
    }

    const _1MB = 1024 * 1024;

    function handleFileChange(e) {
        addToOnScreenLog("filechange triggered");
        const files = Array.from(e.target.files);
        if (files && files[0]) {
            const file = files[0];
            if (file.size < _1MB) {
                const formData = new FormData();
                formData.append("image", file);
                addToOnScreenLog("Uploading file: " + file.name + " with size: " + file.size);

                addToOnScreenLog("Uploading url : " + UPLOAD_IMAGE_URL);
                setUploading(true);
                fetch(UPLOAD_IMAGE_URL, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => {
                        console.log("Response status: ", res.status);
                        addToOnScreenLog("Response status: " + res.status);
                        return res.json()
                    })
                    .then(result => {
                        addToOnScreenLog("Result:" + (JSON.stringify(result)));
                        console.log("Result: ", result);
                        setItem({
                            ...item,
                            'image': result
                        });
                    })
                    .catch((error) => {
                        console.log("ERROR", error.message);
                        addToOnScreenLog(error.message);
                        setErrorMsg("Could not upload file to server.")
                    }).finally(() => setUploading(false));;
            } else {
                setErrorMsg("Selected file is to large ( > 1MB )" + file.size/1024/1024 )
            }
        } else {
            console.log("no file to send ?")
        }
    }

    function handleSubmit(event) {
        //if (!formIsValid()) return;

        addToOnScreenLog("Submitting form with item:");
        event.preventDefault();
        addToOnScreenLog(JSON.stringify(item));
        setSaving(true);
        saveItem(item).then(() => {
            props.history.push("/");
            toast.success(`${item.title} Saved.`);
            setSaving(true);
        }).catch((error) => {
            console.log("ERROR", error.message);
            addToOnScreenLog(error.message);
            setErrorMsg("Could not save form to server.")
        }).finally(() => setSaving(false));

    }


    return (
        <div className="container">
            {/*<div className="onScreenLogger">*/}
            {/*    <h5>onScreenLogger (tm):</h5>*/}
            {/*    {onScreenLog.map((value, index) => (<p key={index}>{value}</p>))}</div>*/}
            <ItemForm
                disabled={uploading|| saving}
                item={item}
                onChange={handleFormChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}/>
            {saving && <div className="saving"> 'Saving!'</div>}
            {uploading && <div className="uploading"> 'Uploading!'</div>}
            <div className="error">{errorMsg}</div>
        </div>
    );
}

export default ManageItemPage;
