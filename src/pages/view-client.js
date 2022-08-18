import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const ViewClient = () => {
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
    loading ? <Loading /> :
      <>
        <h1 className="font-bold text-4xl text-blue-900">View Client: {client.name}</h1>

        {Object.keys(client).length === 0 ? <p className="mt-5 font-bold">The client has not been found.</p> :
          <div className="space-y-5 mt-10">
            <p className="text-2xl text-gray-600">
              <span className="text-gray-800 uppercase font-bold">Name: </span>
              {client.name}
            </p>
            <p className="text-2xl text-gray-600">
              <span className="text-gray-800 uppercase font-bold">Email: </span>
              {client.email}
            </p>
            {client.phone &&
              <p className="text-2xl text-gray-600">
                <span className="text-gray-800 uppercase font-bold">Phone: </span>
                {client.phone}
              </p>
            }
            <p className="text-2xl text-gray-600">
              <span className="text-gray-800 uppercase font-bold">Company: </span>
              {client.company}
            </p>
            {client.notes &&
              <p className="text-2xl text-gray-600">
                <span className="text-gray-800 uppercase font-bold">Notes: </span>
                {client.notes}
              </p>
            }
          </div>
        }
      </>
  );
};

export default ViewClient;