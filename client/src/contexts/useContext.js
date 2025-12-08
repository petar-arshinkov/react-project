import { createContext } from "react";

const AuthContext = createContext({
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

export default AuthContext;