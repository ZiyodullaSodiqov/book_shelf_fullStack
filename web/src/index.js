import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"
import Login from './components/register/signUp/LogIn'
import Book from './components/books/Book'

import './assets/style.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Book />} />
      </Routes>
    </BrowserRouter>
);
