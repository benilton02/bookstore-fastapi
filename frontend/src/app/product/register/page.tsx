'use client'

import React, { useState } from 'react';

export default function Page() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleProductRegistration = () => {
    // Handle product registration logic here
    console.log('Registering product with:', { productName, price, description });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-100 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Cadastrar Produto</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-600 text-sm font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            //   rows="4"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleProductRegistration}
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark"
          >
            Cadastar
          </button>
        </form>
      </div>
    </div>
  );
};
