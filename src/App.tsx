/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { HotelGenerator } from './pages/HotelGenerator';
import { ImageAnalyzer } from './pages/ImageAnalyzer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hotel-generator" element={<HotelGenerator />} />
          <Route path="image-analyzer" element={<ImageAnalyzer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
