'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

import dotenv from 'dotenv';
dotenv.config();


export default function Page() {
  const [bookName, setBookName] = useState('');
  const [nomeDoAutor, setNomeDoAutor] = useState('')
  const [tipo, setTipo] = useState('')
  const [genero, setGenero] = useState('')
  const [editora, setEditora] = useState('')
  const [lancamento, setLancamento] = useState('')
  const [anoDeEdicao, setAnoEdicao] = useState('')
  const [numEdicao, setNumEdicao] = useState('')
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL


  const handleProductRegistration = async () => {
    // Handle product registration logic here
    console.log('Registering product with:', { 
      bookName,
      nomeDoAutor,
      tipo,
      genero,
      editora,
      lancamento,
      anoDeEdicao,
      numEdicao, });


      try {
        setLoading(true);
        const postData = {
          nome: bookName,
          nomeDoAutor: nomeDoAutor,
          lancamento: lancamento,
          tipo: tipo,
          genero: genero,
          editora: editora,
          anoEdicao: anoDeEdicao,
          numEdicao: numEdicao
        };
    
        // Limpar os estados dos campos
        setBookName('');
        setNomeDoAutor('');
        setTipo('');
        setGenero('');
        setEditora('');
        setLancamento('');
        setAnoEdicao('');
        setNumEdicao('');

        const token = localStorage.getItem('accessToken');
    
        const response = await fetch(`${apiUrl}/books`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postData)
        });
        setLoading(false);
        if (response.ok) {
          const data = await response.json();
          console.log('Product registered successfully:', data);
    
        } else {
          console.error('Failed to register product:', response.statusText);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error registering product:', error);
      } finally{
        setLoading(false);
      }
    };

    const handleBackToList = () => {
      router.push('/product/list');
    }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-100 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Cadastrar Livro</h2>
        <form>
         
         
          <div className="mb-4">
            <label htmlFor="bookName" className="block text-gray-600 text-sm font-medium mb-2">
              Nome do Livro
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          

          <div className="mb-4">
            <label htmlFor="nomeDoAutor" className="block text-gray-600 text-sm font-medium mb-2">
              Nome do Autor
            </label>
            <textarea
              id="nomeDoAutor"
              name="nomeDoAutor"
              value={nomeDoAutor}
              onChange={(e) => setNomeDoAutor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              required
            //   rows="4"
            ></textarea>
          </div>


          <div className="mb-4">
            <label htmlFor="tipo" className="block text-gray-600 text-sm font-medium mb-2">
              Tipo
            </label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="genero" className="block text-gray-600 text-sm font-medium mb-2">
              Gênero
            </label>
            <input
              type="text"
              id="genero"
              name="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="editora" className="block text-gray-600 text-sm font-medium mb-2">
              Editora
            </label>
            <input
              type="text"
              id="editora"
              name="editora"
              value={editora}
              onChange={(e) => setEditora(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="lancamento" className="block text-gray-600 text-sm font-medium mb-2">
              Lançamento
            </label>
            <input
              type="number"
              id="lancamento"
              name="lancamento"
              value={lancamento}
              onChange={(e) => setLancamento(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="anoDeEdicao" className="block text-gray-600 text-sm font-medium mb-2">
              Ano de edição
            </label>
            <input
              type="number"
              id="anoDeEdicao"
              name="anoDeEdicao"
              value={anoDeEdicao}
              onChange={(e) => setAnoEdicao(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="numEdicao" className="block text-gray-600 text-sm font-medium mb-2">
              Número da Edição
            </label>
            <input
              type="number"
              id="numEdicao"
              name="numEdicao"
              value={numEdicao}
              onChange={(e) => setNumEdicao(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleProductRegistration}
            className="mb-3  w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark relative"
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader"></div>
              </div>
            )}
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          
          <button
            type="button"
            onClick={handleBackToList}
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark"
          >
            Voltar
          </button>

        </form>
      </div>
    </div>
  );
};
