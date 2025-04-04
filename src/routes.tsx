import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ResourceDetailView } from './components/detail/ResourceDetailView';
import { SearchPage } from './components/pages/SearchPage';
import { SubmitToolPage } from './components/pages/SubmitToolPage';
import { SponsorUsPage } from './components/pages/SponsorUsPage';
import { ContactUsPage } from './components/pages/ContactUsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'resources/resource/:id',
        element: <ResourceDetailView />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'submit',
        element: <SubmitToolPage />,
      },
      {
        path: 'sponsor-us',
        element: <SponsorUsPage />,
      },
      {
        path: 'contact',
        element: <ContactUsPage />,
      },
    ],
  },
]); 