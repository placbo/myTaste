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
    const [isUploading, setIsUploading] = useState(
        false
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

    function handleFileUpload(e) {
        const files = Array.from(e.target.files);
        //debugger;
        setIsUploading(true); //TODO: doesnt work. why ?
        const formData = new FormData();
        files.forEach((file, i) => {
            formData.append(i, file);
            console.log("ready to upload file : ");
            console.log(file.name);
            console.log("isUploading:  " + isUploading);
        });

        // fetch(`${API_URL}/image-upload`, {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(images => {
        //         this.setState({
        //             uploading: false,
        //             images
        //         })
        //     })
    }

    function handleSubmit(event) {
        event.preventDefault();
        //if (!formIsValid()) return;

        saveItems(item).then(() => {
            props.history.push("/");
            //toast.success("Course saved.");
            toast.success("Course saved.");
        });

        // const formData = new FormData();
        // formData.append('myImage', image);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        // axios.post("/upload",formData,config)
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
                onFileUpload={handleFileUpload}
                onSubmit={handleSubmit}/>
        </div>
    );
}

export default ManageItemPage;
