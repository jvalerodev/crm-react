import React from 'react';
import Form from '../components/Form';

const CreateClient = () => {
  return (
    <>
      <h1 className="font-bold text-4xl text-blue-900">Create Client</h1>
      <p className="mt-3">Fill in the following fields to register a new client.</p>
      <Form />
    </>
  );
};

export default CreateClient;