import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import { getItem, saveItem } from "../api/itemApi";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";

const MB = 1024 * 1024;
const UPLOAD_IMAGE_URL =
  process.env.REACT_APP_MYTASTE_API_HOST + "/mytasteapi/upload/";

function ManageItemPage(props) {
  const [item, setItem] = useState({
    _id: null,
    title: "test",
    image: null
  });

  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState({});

  useEffect(() => {
    const id = props.match.params.id; // from the path `/:id`
    if (id) {
      getItem(id).then(_item => setItem(_item));
    }
  }, [props.match.params.id]);

  function handleFormChange({ target }) {
    setItem({
      ...item,
      [target.name]: target.value
    });
  }

  const createPreview = file =>
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      75,
      0,
      uri => {
        setImage(uri);
      },
      "base64"
    );

  const resizeFile = file =>
    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      "JPEG",
      75,
      0,
      blob => {
        setFile(new File([blob], "upload.jpg"));
      },
      "blob"
    );

  async function handleFileChange(e) {
    const files = Array.from(e.target.files);
    if (files && files[0]) {
      let file = files[0];
      createPreview(file);
      resizeFile(file);
    } else {
      toast.error("Could not detect any file");
    }
  }

  const getFormatedFileSize = file => (file.size / 1024 / 1024).toFixed(2);

  const uploadfile = () => {
    if (file.size < 1 * MB) {
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);
      fetch(UPLOAD_IMAGE_URL, {
        method: "POST",
        body: formData
      })
        .then(res => {
          return res.json();
        })
        .then(result => {
          toast.success("Image uploaded");
          setItem({
            ...item,
            image: result
          });
        })
        .catch((e) => {
          toast.error("Could not upload file to server",e);
        })
        .finally(() => setUploading(false));
    } else {
      toast.error(
        `Selected file is to large (${getFormatedFileSize(file)}MB > 1MB )`
      );
    }
  };

  function handleSubmit(event) {
    //if (!formIsValid()) return;
    event.preventDefault();
    setSaving(true);
    saveItem(item)
      .then(() => {
        toast.success(`${item.title} Saved.`);
        props.history.push("/");
        setSaving(true);
      })
      .catch(() => {
        toast.error("Could not save to server");
      })
      .finally(() => setSaving(false));
  }

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="fileUpload">Last opp</label>
        <div className="field">
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            name="fileUpload"
            accept="image/*"
          />
        </div>
      </div>
      {image && file && (
        <>
          <div>
            <img src={image} alt="preview" />
          </div>
          Filesize: {getFormatedFileSize(file)} MB
          <button onClick={uploadfile}>Upload image</button>
        </>
      )}
      {uploading && <div className="blockScreen">Uploading...</div>}

      <ItemForm
        disabled={uploading || saving}
        item={item}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      {saving && <div className="blockScreen">Saving...</div>}
    </div>
  );
}

export default ManageItemPage;
