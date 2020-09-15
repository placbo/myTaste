import React, {useEffect, useState} from "react";
import ItemList from "./ItemList";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as firebase from "firebase";
import {toast} from "react-toastify";
import {ITEM_COLLECTION_NAME} from "../api/api";

const PageContent = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const ItemListPage = () => {
    const [items, setItems] = useState([]);

    //add some data
    // firebase
    //     .firestore()
    //     .collection(ITEM_COLLECTION_NAME)
    //     .add({title:"per", image:"test.png", comment:"comment"});


    useEffect(() => {
        firebase
            .firestore()
            .collection(ITEM_COLLECTION_NAME)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        _id: doc.id
                    };
                });
                setItems(data);
            })
            .catch(error => toast.error(error.message));
    }, []);

    return (
        <>
            <Header/>
            <PageContent>
                <ItemList items={items}/>
            </PageContent>
            <Footer/>
        </>
    );
}

export default ItemListPage;
