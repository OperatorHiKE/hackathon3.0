import Menu from './components/Menu/Menu.component';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Item from './components/Item/Item.component';
import Header from './components/header/header.component';
import Category from './components/category/category';
import Items from './components/Items/Item.component';

const App = () => {
  return (
    <div className="wrapper">
      <Routes >
        <Route path='/' element={<Header />}>
          <Route index element={<Menu />} />
          <Route path=':itemId' element={<Item />} />
          <Route path="/menu/:category" element={<Category />} />
          <Route path="/menu/:category/:id" element={<Items />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
