import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ParentComponent from './Components/ParentComponent.tsx'
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';


createRoot(document.getElementById('root')!).render(

    <PrimeReactProvider value={{ ripple: true }}>
      <ParentComponent />
    </PrimeReactProvider>

)
