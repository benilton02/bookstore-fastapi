'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Page() {

const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleSignup = async () => {
    // Handle signup logic here

    console.log('Signing up with:', { email, password });

    try {
      const url = `http://localhost:7070/singup?email=${email}&password=${password}`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: '',
      });
  
      if (response.ok) {
        const data = await response.json();
        router.push('/signin')

        console.log('Cadastro bem-sucedido:', data);
      } else {
        console.error('Falha no cadastro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
    

  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-100 shadow-md">
        <h2 className="text-2xl font-bold mb-6 bg-gray-50">Cadastro</h2>
        <form>
          {/* <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}