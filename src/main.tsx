import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Create from './components/Create.tsx';
import Edit from './components/Edit.tsx';
import Registor from './components/Registor.tsx';
import VirtualizedList from './components/VirtualizedList.tsx';
import ManageProduct from './components/ManageProduct.tsx';
import Cart from './components/Cart.tsx';
import UserMangement from './components/UserMangement.tsx';
import InfinieScroll from './components/InfiniteScroll.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';


const router = createBrowserRouter([
  {
    path: '/',
    element: <ManageProduct />
  },

  {
    path: '/create',
    element: <Create />
  },
  {
    path: '/edit/:id',
    element: <Edit />
  },
  {
    path: '/registor',
    element: <Registor />
  },
  {
    path: '/vitualize',
    element: <VirtualizedList />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/member-management',
    element: <UserMangement />
  },
  {
    path: '/infinite-scroll',
    element: <InfinieScroll />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,

)
