import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/products/:theme/:slug" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
