import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-white text-4xl text-center font-black">CRM - Customers</h2>
        <nav className="mt-10 px-5">
          <Link
            to="/"
            className={`text-white text-xl block mt-2 transition hover:bg-blue-300 px-4 py-2 rounded-md ${location.pathname === '/' && 'bg-blue-300'}`}
          >Customers
          </Link>
          <Link
            to="/create"
            className={`text-white text-xl block mt-2 transition hover:bg-blue-300 px-4 py-2 rounded-md ${location.pathname === '/new-client' && 'bg-blue-300'}`}
          >Create Client
          </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 bg-gray-100 md:h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;