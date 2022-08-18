import React, { useEffect, useState } from 'react';
import Client from '../components/Client';
import Loading from '../components/Loading';

const Index = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const res = await fetch(url);
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    getCustomers();
  }, []);

  const handleDelete = async id => {
    const conf = confirm('Are you sure you want to delete this client?');

    if (!conf) return;

    try {
      const url = `${import.meta.env.VITE_API_URL}/${id}`;
      await fetch(url, {
        method: 'DELETE'
      });

      const newCustomers = customers.filter(client => client.id !== id);
      setCustomers(newCustomers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    loading ? <Loading /> :
      <>
        <h1 className="font-bold text-4xl text-blue-900">Customers</h1>
        <p className="mt-3">Manage your clients.</p>

        <table className="w-full mt-10 table-auto shadow bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Company</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(client => (
              <Client
                key={client.id}
                client={client}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </>
  );
};

export default Index;