import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,
   Routes,
   Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Blog from './components/Blog/Index';
import BlogDetail from './components/Blog/Detail';
import Home from './Home';
import IndexMember from './components/Member/Index';



import EditProduct from './components/Account/ProductAccount/EditProduct';
import MyProduct from './components/Account/ProductAccount/MyProduct';
import CreateProduct from './components/Account/ProductAccount/AddProduct';
import Update from './components/Account/MemberAccount/Update';

import ProductList from './components/Product/Detail';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Cart/Cart';
import CartTest from './components/Cart/CartTest';
import { Provider } from 'react-redux';
import store from './store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/blog/list' element={<Blog/>} />
          <Route path='/blog/detail/:id' element={<BlogDetail/>} />
          <Route path='/login' element={<IndexMember/>} />
          <Route path='/account' element={<Update/>} />
          <Route path='/account/product/create' element={<CreateProduct/>} />
          <Route path='/account/product/list' element={<MyProduct/>} />
          <Route path='/account/product/edit/:id' element={<EditProduct/>} />
          <Route path='/product/detail' element={<ProductList/>} />
          <Route path='/product/detail/:id' element={<ProductDetail/>} />
          <Route path='/product/cart' element={<Cart/>} />

        </Routes>
      </App>
    </Router>
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
