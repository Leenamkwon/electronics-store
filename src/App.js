import React from 'react';

// react router dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Page
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import PrivateRoute from './components/PrivateRoute';

// components
import Header from './components/Header';
import Alert from './components/Alert';
import ScrollButton from './components/ScrollButton';

// components
export default function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <ScrollButton />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <PrivateRoute path='/checkout'>
          <Checkout />
        </PrivateRoute>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/products' exact>
          <Products />
        </Route>
        <Route path='/products/:id' children={<ProductDetails />}></Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
