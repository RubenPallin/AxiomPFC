import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
  );
}

export default App;
