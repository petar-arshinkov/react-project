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
import Logout from "./components/Logout"
import UserContext from "./contexts/useContext.js"
import useRequest from "./hooks/useRequest.js"



function App() {
  const [user, setUser] = useState(null);
  const { request } = useRequest()


  const registerHandler = async (email, password) => {

    const newUser = { email, password };


    const result = await request('/users/register', 'POST', newUser);
  
    
    if (!result.accessToken) {
      throw new Error('Registration failed');
    }

    setUser(result);

  }

  const loginHandler = () => {


    if (!user) {
      alert("Invalid credentials");
      throw new Error("Invalid credentials");
    }

    setUser(user);
  }

  const logoutHandler = () => {
    setUser(null);
  }

  const authContextValues = {
    loginHandler,
    registerHandler,
    logoutHandler,
    isAuthenticated: !!user?.accessToken,
    user
  };

  return (
    <div className="flex flex-col min-h-screen">
      <UserContext.Provider value={authContextValues}>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login onLogin={loginHandler} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/posts/create/" element={<Create />} />
          <Route path="/posts/view/:id" element={<Details />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div>
  )
}

export default App
