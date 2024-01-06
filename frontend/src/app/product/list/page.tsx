'use client'

import React, { useState, useEffect } from 'react';

interface Product {
  id: number
  nome: string
  nomeDoAutor: string
  lancamento: number,
  tipo: string
  genero: string
  editora: string
  anoEdicao: number,
  numEdicao: number
}

export default function () {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('Digite aqui...');
  // Dummy product data for demonstration purposes
  // const dummyProducts = [
    // { id: 1, productName: 'Product A', price: 19.99, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    // { id: 2, productName: 'Product B', price: 29.99, description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
    // // Add more products as needed
  // ];

  useEffect(() => {
    // Fetch product data from an API or database
    // For now, use the dummyProducts as sample data
    
    const fetchProductData = async () => {
      try {

        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:7070/books?page=1&size=50', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          debugger
          setProducts(data.items);
        } else {
          console.error('Failed to fetch product data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData(); // Call the function to fetch product data
  }, []);
    

  const handleSearch = async() => {
    // Lógica para lidar com a pesquisa, se necessário
    console.log('Pesquisando por:', searchTerm);
    setSearchTerm('');
    setPlaceholder('Nome do livro...');
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:7070/books?page=1&size=50&search=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.items);
      } else {
        console.error('Failed to fetch product data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  //   console.log('Fetching product data from')
  //   setProducts(dummyProducts);
  // }, []);
  // Usar esse!
//     useEffect(() => {

//     localStorage.getItem('token')

//     header: Bearer + token
//     const fetchData = async () => {

//       try {
//         const response = await fetch(
//           `http://localhost...`
//         );
//         const body = await response.json();
//         console.log('Fetched data:', body);
//         setProducts(body);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } 
//     };
//   }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Livros</h2>
        
        <input
          type="text"
          placeholder="Digite aqui..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4"
        />

        <button
            onClick={handleSearch}
            className="bg-primary text-white p-2 rounded-md ml-2 hover:bg-primary-dark"
          >
            Pesquisar
          </button>

        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-50 p-4 rounded-md shadow-md">
              <h3 className="text-xl text-primary font-bold mb-2">{product.nome}</h3>
              <p className="text-gray-600 mb-2">Autor: {product.nomeDoAutor}</p>
              <p className="text-gray-600 mb-2">Publicação: {product.editora}</p>
              <p className="text-gray-700">Ano de Lançamento: {product.lancamento}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  };