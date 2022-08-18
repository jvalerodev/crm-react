import React from 'react';

const ErrorForm = ({ value }) => {
  return (
    <div className="text-center my-4 py-3 bg-red-500 text-white font-bold uppercase rounded">
      <p>{value}</p>
    </div>
  );
};

export default ErrorForm;