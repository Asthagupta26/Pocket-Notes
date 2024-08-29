import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Chat from './components/pages/Chat';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
