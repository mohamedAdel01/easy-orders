import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Primary Main Route (1:1 Pixel-Perfect Figma Design) */}
        <Route path="/" element={<ProductPage />} />
        <Route path="/products/:theme/:slug" element={<ProductPage />} />
        <Route path="/ui-only" element={<Navigate to="/" replace />} />
        <Route path="/pixel-perfect" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
