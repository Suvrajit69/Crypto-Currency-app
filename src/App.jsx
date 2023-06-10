import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import{
  Header,
  Coins,
  Home,
  Exchanges,
  CoinDetails
} from './components'
import Footer from './components/Footer';

function App() {
    return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/exchanges' element={<Exchanges/>}/>
        <Route path='/coin/:id' element={<CoinDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
