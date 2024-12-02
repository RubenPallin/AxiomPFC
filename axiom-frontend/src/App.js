import logo from './logo.svg';
import './App.css';
import MainHero from './components/main/MainHero';
import FeaturedProducts from './components/main/FeaturedProducts';
import PromoBanner from './components/main/PromoBanner';

function App() {
  return (
    <div className="App">
      <MainHero />
      <FeaturedProducts />
      <PromoBanner />
    </div>
  );
}

export default App;
