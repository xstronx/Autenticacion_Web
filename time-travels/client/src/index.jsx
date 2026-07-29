import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from "./context/authContext";
import { Phase3 } from './componentes/Phase3';
import { Phase2 } from './componentes/Phase2';

import { Phase4 } from './componentes/Phase4';
import { Phase7 } from './componentes/Phase7';
import { Phase1 } from './componentes/Phase1';
import { Phase8 } from './componentes/Phase8';
import Add from './principal/Add';
import Editar from './principal/Editar';
import Phase9 from './componentes/Phase9';
import Vacio from './componentes/Vacio';

const router = createBrowserRouter([
    {
        path:"/",
        element: <Phase1/>,
    },
    {
        path:"/servicios",
        element: <Phase4/>,
    },
    {
        path:"/conocer",
        element: <Phase2/>,
    },
    {
        path:"/compras",
        element:<Phase7/>,
    },
    {
        path:"/inicio",
        element:<Phase3/>
    },
    {
        path:"/registro",
        element:<Phase8/>
    },
    {
        path:"/add",
        element:<Add/>
    },
    {
        path:"/update:id",
        element:<Editar/>
    },
    {
        path:"/check",
        element:<Phase9/>
    },
    {
        path:"/vacio",
        element:<Vacio/>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
    <React.StrictMode>
       <ThemeProvider theme={theme}>
         <GlobalStyle />
         <RouterProvider router={router}/>
       </ThemeProvider>
    </React.StrictMode>
    </AuthContextProvider>
);


