import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './router/routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import AuthProvider from './authcontext/AuthProvider.jsx'


const queryClient = new QueryClient;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer></ToastContainer>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
