import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ErrorForm from './ErrorForm';
import Loading from '../components/Loading';

const Form = ({ client, loading }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: client?.name || '',
      company: client?.company || '',
      email: client?.email || '',
      phone: client?.phone || '',
      notes: client?.notes || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name is too short')
        .max(30, 'Name is too long')
        .required('Name is required'),
      company: Yup.string()
        .required('Company name is required'),
      email: Yup.string()
        .required('Email address is required')
        .email('Invalid email address'),
      phone: Yup.number()
        .positive('Invalid phone number')
        .integer('Invalid phone number')
        .typeError('Invalid phone number')
    }),
    onSubmit: async (values, actions) => {
      try {
        const url = !client ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/${client.id}`;
        await fetch(url, {
          method: !client ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        actions.resetForm();
        navigate('/customers');
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    loading ? <Loading /> :
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl text-center uppercase">{client ? 'Edit Client' : 'Add Client'}</h1>

        <form className="mt-10" onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            {formik.touched.name && formik.errors.name ? <ErrorForm value={formik.errors.name} /> : null}
            <input
              type="text"
              className="mt-2 block w-full p-3 bg-gray-100 outline-blue-800"
              placeholder="Name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-5">
            {formik.touched.company && formik.errors.company ? <ErrorForm value={formik.errors.company} /> : null}
            <input
              type="text"
              className="mt-2 block w-full p-3 bg-gray-100 outline-blue-800"
              placeholder="Company"
              id="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-5">
            {formik.touched.email && formik.errors.email ? <ErrorForm value={formik.errors.email} /> : null}
            <input
              type="email"
              className="mt-2 block w-full p-3 bg-gray-100 outline-blue-800"
              placeholder="Email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-5">
            {formik.touched.phone && formik.errors.phone ? <ErrorForm value={formik.errors.phone} /> : null}
            <input
              type="tel"
              className="mt-2 block w-full p-3 bg-gray-100 outline-blue-800"
              placeholder="Phone number"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-5">
            <textarea
              className="mt-2 block w-full p-3 bg-gray-100 outline-blue-800 h-40 resize-none"
              placeholder="Notes"
              id="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>

          <input
            type="submit"
            value={client ? 'Edit Client' : 'Add Client'}
            className="w-full bg-blue-800 text-white py-3 font-bold uppercase rounded-md cursor-pointer transition hover:bg-blue-900"
          />
        </form>
      </div>
  );
};

export default Form;