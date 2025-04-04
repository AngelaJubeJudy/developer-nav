import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ResourceDetailView } from './components/detail/ResourceDetailView';
import { SearchPage } from './components/pages/SearchPage';
import { SubmitToolPage } from './components/pages/SubmitToolPage';
import { SponsorUsPage } from './components/pages/SponsorUsPage';
import { ContactUsPage } from './components/pages/ContactUsPage';
import { SubmitToolFormPage } from './components/pages/SubmitToolFormPage';

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
        path: 'submit-tool',
        element: <SubmitToolFormPage />,
      },
      {
        path: 'custom-campaign',
        element: <ContactUsPage />,
      },
      {
        path: 'sponsor-us',
        element: <SponsorUsPage />,
      },
      {
        path: 'sponsor-us/:sponsorType',
        element: <ContactUsPage />,
      },
      {
        path: 'contact',
        element: <ContactUsPage />,
      },
    ],
  },
]); 