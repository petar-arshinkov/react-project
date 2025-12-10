import { createContext, useState } from "react";
import useRequest from "../hooks/useRequest";

const UserContext = createContext({
    isAuthenticated: false,  
    user: {

        email: "",
        password: "",
        _createdOn: 0,
        _id: "",
        accessToken: ""

    },
    loginHandler(){},
    registerHandler(){},
    logoutHandler(){},
    
});

export function UserProvider({children}) {

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

  const loginHandler = async (email, password) => {
    const result = await request('/users/login', 'POST', { email, password });

    const user = result;
    console.log(user);


    if (!user) {
      alert("Invalid credentials");
      throw new Error("Invalid credentials");
    }

    setUser(user);
  }

  const logoutHandler = () => {
    return request('/users/logout', "GET", null, {accessToken: user.accessToken})
      .finally(() => {
        setUser(null);
      }
      );
  }

  const userContextValues = {
    loginHandler,
    registerHandler,
    logoutHandler,
    isAuthenticated: !!user?.accessToken,
    user
  };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext; 