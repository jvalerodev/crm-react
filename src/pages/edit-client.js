import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from '../components/Form';


const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClient = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setClient(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(!loading);
    };

    getClient();
  }, []);

  return (
    <>
      <h1 className="font-bold text-4xl text-blue-900">Edit Client</h1>
      {!client.name ? <p className="mt-5 font-bold">The client has not been found.</p> :
        <>
          <p className="mt-3">Fill out the following form to edit the customer data.</p>
          <Form client={client} loading={loading} />
        </>
      }
    </>
  );
};

export default EditClient;