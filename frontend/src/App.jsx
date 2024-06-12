import { BrowserRouter, Routes, Route} from 'react-router-dom' 
import './App.css'

import Register from './components/auth/Register'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
