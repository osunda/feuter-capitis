"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-transparent z-10 transition-opacity duration-300 ${scrollY > 50 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/feuterbanner.png" 
              alt="Feuter's Analysis" 
              width={150} 
              height={40} 
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex-grow flex items-center justify-center space-x-4">
            <Link href="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/daily-stocks" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
              Daily stocks
            </Link>
            <Link href="/stock-picker" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
              Stock picker
            </Link>
          </div>
          <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar