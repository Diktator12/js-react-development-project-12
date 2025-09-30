import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne } from './components/Pages.jsx';
import LoginForm from './pages/LoginPage.jsx';
import NotFound from './pages/NotFoundPage.jsx';
import PAGEPATH from './helpers/pagePath.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGEPATH.HOME} element={<PageOne />} />
        <Route path={PAGEPATH.LOGIN} element={<LoginForm />}  />
        <Route path={PAGEPATH.NOTFOUND} element={<NotFound />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App;