import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ResourceDetailView } from './components/detail/ResourceDetailView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'resources/resource/:id',
        element: <ResourceDetailView />,
      },
    ],
  },
]); 