import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Livros',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const response = await fetch('http://192.168.1.5:8000/public/tags');
  // const tags: string[] = await response.json();

  return (
    <html lang="en">
      <body className="root flex flex-col justify-start items-center min-h-screen font-['Lexend_Deca']">
        <div className="w-full max-w-screen-lg">
  
          <div className='w-full flex flex-row justify top-0 left-0'>
              <div className='w-full flex flex-row justify-center'>
                <nav className="w-[1024px] px-8 h-16 text-primary flex flex-row justify-end items-center space-x-4 underline">
                  <a href="/signin" className="font-bold text-xl">Sign in</a>
                  <a href="/signup" className="font-bold text-xl">Sign up</a>
                </nav>
              </div>
          </div>
          {/* container */}
          <div className="w-full px-8 flex flex-row mt-24 ">
            <div className='flex-1'>{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
