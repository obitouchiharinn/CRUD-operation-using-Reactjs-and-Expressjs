import BHome from './working/HHome'
import Data from './working/data_fetching'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Edit_Data from './working/edir_data_fetching'

function App() {

  return (
    <Router>
      <Routes>

      <Route path='/BHome' element={<BHome /> } />
      <Route path='/Data' element={<Data /> } />
      <Route path="/edit/:id" element={<Edit_Data />} />

      </Routes>
    </Router>
  )
}

export default App
