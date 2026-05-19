"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authAPI.logout();
    router.push('/login');
  };

  return (
    <header className={`flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            SM
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">School Management System</h1>
            <p className="text-sm text-gray-500">Education Excellence Platform</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={handleSignOut}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l2-2m0 0l-2-2m2 2l-2 2m2 2l-2 2m0 0l2-2m-2 2l-2-2" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};