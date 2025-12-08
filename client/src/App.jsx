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



function App() {
  const [user, setUser] = useState(null);


  const registerHandler = async (email, password) => {

    const newUser = { email, password };


    const response = await fetch('http://localhost:3030/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const result = await response.json();

    console.log(result);
    
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
    isAuthenticated:!!user?.accessToken,  
    user
  };

  return (
    <div className="flex flex-col min-h-screen">
      <UserContext.Provider value={authContextValues}>
      <Header/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route path="/register" element={<Register/>} />
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
