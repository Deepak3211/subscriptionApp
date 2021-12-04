import Navbar from "./components/navbar/Navbar"
import MainPages from './components/mainpages/Pages'
import { BrowserRouter as Router } from "react-router-dom"
const App = () => {
  return (

    <Router>
      <Navbar />
      <MainPages />
    </Router>
  )
}

export default App
