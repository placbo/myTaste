import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { getAllItems } from '../api/api';

const PageContent = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const ItemListPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems()
      .then((result) => {
        setItems(result);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  return (
    <>
      <Header />
      <PageContent>
        <ItemList items={items} />
      </PageContent>
      <Footer />
    </>
  );
};

export default ItemListPage;
