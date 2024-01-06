'use client'
import React, { useState } from 'react';

export default function Page() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Handle login logic here
    console.log('Logging in with:', { username, password });
    try {
      const url = 'http://localhost:7070/login';
      const data = new URLSearchParams({
        'grant_type': '',
        'username': username,
        'password': password,
        'scope': '',
        'client_id': '',
        'client_secret': ''
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      });
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('accessToken', responseData.access_token);
        console.log('Login bem-sucedido:', responseData);

        // Atribua o token à sua lógica de estado ou contexto
        // Por exemplo, você pode usar useContext para atualizar o estado globalmente
        // ou useState se estiver usando apenas no componente localmente.

        // setToken(responseData.token);

        // Depois de definir o token, você pode redirecionar ou realizar outras ações.
      } else {
        console.error('Falha no login:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
    // fetch

    // setToken

    //....
  };

    return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-100 shadow-md">
        <h2 className="text-2xl font-bold mb-6 bg-gray-50">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            onClick={handleLogin}
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    )
}