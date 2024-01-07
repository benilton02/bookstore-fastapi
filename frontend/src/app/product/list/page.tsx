'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import dotenv from 'dotenv';
dotenv.config();

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

// ... Seu código anterior

export default function () {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('Digite aqui...');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {    
    fetchProductData();
  }, [currentPage, pageSize, searchTerm]);

  const fetchProductData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/books?page=${currentPage}&size=${pageSize}&search=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.items);
        setTotalItems(data.total);
      } else {
        console.error('Failed to fetch product data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleSearch = async () => {
    setSearchTerm('');
    setPlaceholder('Nome do livro...');
    setCurrentPage(1); // Redefine a página atual ao realizar uma nova pesquisa
  };

  const handleRegister = () => {
    router.push('/product/register');
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalItems / pageSize);
  const paginationArray = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Livros</h2>
        

        <div>
          <input
            type="text"
            placeholder="Digite aqui..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-4"
          />

          <button
            onClick={handleRegister}
            className="bg-primary text-white p-2 rounded-md ml-2 hover:bg-primary-dark"
          >
            Casatrar Novo livro
          </button>

        </div>
        

        

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

        {/* Adiciona os botões de paginação */}
        <div className="flex mt-4">
          {paginationArray.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-3 py-1 border ${currentPage === pageNumber ? 'bg-primary text-white' : 'border-gray-300'}`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
