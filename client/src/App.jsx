import { Route, Routes } from "react-router"
import Home from "./components/Home"
import Login from "./components/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Blog from "./components/Blog"
import Details from "./components/Details"
import Create from "./components/Create"
import Register from "./components/Register"
import { useState } from "react"

function App() {
  const [user, setUser] = useState(null);

  return (
     <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/posts/create/" element={<Create />} />
        <Route path="/posts/view/:id" element={<Details />} />
      </Routes>
      <Footer />
      </div>
  )
}
 
export default App
