import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import UiOnlyPixelPerfectPage from './pages/UiOnlyPixelPerfectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Default Route: 1:1 Pixel-Perfect UI Page */}
        <Route path="/" element={<UiOnlyPixelPerfectPage />} />
        <Route path="/ui-only" element={<UiOnlyPixelPerfectPage />} />
        <Route path="/pixel-perfect" element={<UiOnlyPixelPerfectPage />} />
        <Route path="/ui-only-pixel-perfect" element={<UiOnlyPixelPerfectPage />} />

        {/* Dynamic API Page */}
        <Route path="/dynamic" element={<ProductPage />} />
        <Route path="/dynamic-api" element={<ProductPage />} />
        <Route path="/products/:theme/:slug" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
