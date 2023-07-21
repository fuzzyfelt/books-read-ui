import { Navbar } from '../elements/Navbar';
import { BookList } from '../elements/Booklist';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import './Home.css';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className='mainLayout'>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <BookList />
      </QueryClientProvider>
    </div>
  )
}