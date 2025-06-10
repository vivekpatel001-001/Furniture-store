// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';

import './index.css'
import App from './App.jsx'
import { CartProvider } from './componets/Cart/Cartcontext.jsx'
import { WishlistProvider } from './componets/Watchlist/Watchlistcontact.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>

  <CartProvider>
    <WishlistProvider>
      {/* <StrictMode> */}
      <App />
    </WishlistProvider>
    {/* </StrictMode> */}
  </CartProvider>
    </BrowserRouter>

  ,
)
