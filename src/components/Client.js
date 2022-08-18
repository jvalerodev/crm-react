import React from 'react';
import { useNavigate } from 'react-router-dom';

const Client = ({ client, handleDelete }) => {
  const { name, email, company, phone, id } = client;
  const navigate = useNavigate();

  return (
    <tr className="text-center border-b-2 hover:bg-gray-100">
      <td className="p-3">{name}</td>
      <td className="p-3">
        <p><span className="text-gray-800 font-bold">Email: </span>{email}</p>
        <p><span className="text-gray-800 font-bold">Phone: </span>{phone}</p>
      </td>
      <td className="p-3">{company}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-yellow-500 transition hover:bg-yellow-600 block w-3/4 mx-auto text-white p-2 uppercase font-bold text-sm rounded"
          onClick={() => navigate(`/customers/${id}`)}
        >View
        </button>
        <button
          type="button"
          className="bg-blue-600 transition hover:bg-blue-700 block w-3/4 mx-auto text-white p-2 uppercase font-bold text-sm rounded mt-3"
          onClick={() => navigate(`/customers/edit/${id}`)}
        >Edit
        </button>
        <button
          type="button"
          className="bg-red-600 transition hover:bg-red-700 block w-3/4 mx-auto text-white p-2 uppercase font-bold text-sm rounded mt-3"
          onClick={() => handleDelete(id)}
        >Delete
        </button>
      </td>
    </tr>
  );
};

export default Client;