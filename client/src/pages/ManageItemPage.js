import React, { useContext, useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import { addItem, getItem, updateItem } from '../api/api';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../Auth';

const PageContent = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.box};
  border-radius: 8px;
  width: 100%;
  max-width: 50rem;
  margin: 1rem auto;
  padding: 1rem;
`;

const BlockScreen = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease-in;
`;

const MB = 1024 * 1024;

const ManageItemPage = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [item, setItem] = useState({
    id: null,
    title: '',
    image: null,
    rating: null,
    creator: currentUser.email,
  });

  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const id = props.match.params.id; // from the path `/:id`
    if (id) {
      getItem(id)
        .then((result) => {
          setItem(result);
        })
        .catch((error) => toast.error(error.message));
    }
  }, [props.match.params.id]);

  const handleFormChange = ({ target }) => {
    setItem({
      ...item,
      [target.name]: target.value,
    });
  };

  const createPreview = (file) =>
    Resizer.imageFileResizer(
      file,
      300,
      300,
      'JPEG',
      75,
      0,
      (uri) => {
        setImage(uri);
      },
      'base64'
    );

  const resizeFile = (file) =>
    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      'JPEG',
      75,
      0,
      (blob) => {
        setFile(new File([blob], `${uuidv4()}.jpg`));
      },
      'blob'
    );

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files && files[0]) {
      let file = files[0];
      createPreview(file);
      resizeFile(file);
    } else {
      toast.error('Could not detect any file');
    }
  };

  const getFormatedFileSize = (file) => (file.size / 1024 / 1024).toFixed(2);

  const uploadfile = () => {
    const metadata = {
      contentType: 'image/jpeg',
    };

    if (file.size < 1 * MB) {
      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
      setUploading(true);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
            default:
              console.log('defaul');
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('Unauthorized');
              break;
            case 'storage/canceled':
              console.log('Canceled');
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('Unknown error', error.serverResponse);
              break;
            default:
              console.log('default');
          }
        },
        () => {
          setUploading(false);
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            setItem({
              ...item,
              image: downloadURL,
            });
          });
        }
      );
    } else {
      toast.error(`Selected file is to large (${getFormatedFileSize(file)}MB > 1MB )`);
    }
  };

  const handleSubmit = (event) => {
    //if (!formIsValid()) return;
    event.preventDefault();
    setSaving(true);
    if (item.id) {
      setSaving(true);
      updateItem(item)
        .then(() => {
          toast.success(`${item.title} Saved.`);
          props.history.push('/');
        })
        .catch(() => {
          toast.error('Could not save to server');
        })
        .finally(() => setSaving(false));
    } else {
      addItem(item)
        .then(() => {
          toast.success(`${item.title} Saved.`);
          props.history.push('/');
        })
        .catch(() => {
          toast.error('Could not save to server');
        })
        .finally(() => setSaving(false));
    }
  };

  return (
    <>
      <Header />
      <PageContent>
        <Card>
          <div className="form-group">
            <label htmlFor="fileUpload">Last opp</label>
            <div className="field">
              <input
                type="file"
                id="fileUpload"
                placeholder="title"
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
          {uploading && <BlockScreen>Uploading...</BlockScreen>}

          <ItemForm disabled={uploading || saving} item={item} onChange={handleFormChange} onSubmit={handleSubmit} />
          {saving && <BlockScreen>Saving...</BlockScreen>}
        </Card>
      </PageContent>
      <Footer />
    </>
  );
};

export default ManageItemPage;
