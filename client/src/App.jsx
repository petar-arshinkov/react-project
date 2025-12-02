import { Route, Routes } from "react-router"
import Home from "./components/Home"
import Login from "./components/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {


  return (
     <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
      </div>
  )
}

export default App
