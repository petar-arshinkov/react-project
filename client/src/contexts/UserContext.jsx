import { createContext, useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";


const UserContext = createContext({
    isAuthenticated: false,
    user: null, 
    likedPostsIds: [], 
    loginHandler: () => {},
    registerHandler: () => {},
    logoutHandler: () => {},
    likeHandler: () => {} 
});

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [likedPostsIds, setLikedPostsIds] = useState([]); // State for liked post IDs
    const { request } = useRequest();

    const isAuthenticated = !!user?.accessToken;

    // --- Side effect to load liked posts when the user logs in ---
    useEffect(() => {
        if (isAuthenticated) {
            
            const fetchUserLikes = async () => {
                try {
                    
                    const likes = await request(`/data/likes?where=_ownerId%3D%22${user._id}%22`, 'GET', null, { accessToken: user.accessToken });
                    const postIds = likes.map(like => like.postId);
                    setLikedPostsIds(postIds);
                } catch (error) {
                    console.error("Failed to fetch user likes:", error);
                    setLikedPostsIds([]); 
                }
            };
            fetchUserLikes();
        } else {

            setLikedPostsIds([]);
        }
    }, [isAuthenticated, user, request]);


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
        const loggedInUser = result;

        if (!loggedInUser || !loggedInUser.accessToken) {
            alert("Invalid credentials");
            throw new Error("Invalid credentials");
        }

        setUser(loggedInUser);
    }

    const logoutHandler = () => {
        return request('/users/logout', "GET", null, { accessToken: user.accessToken })
            .finally(() => {
                setUser(null);
                setLikedPostsIds([]);
            });
    }

    // --- Updated Like Handler ---
    const likeHandler = async (postId) => {
        if (!isAuthenticated) {
            console.error("User must be authenticated to like a post.");
            return;
        }

        const isCurrentlyLiked = likedPostsIds.includes(postId);

        if (isCurrentlyLiked) {

            try {
                const likesForPost = await request(`/data/likes?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${user._id}%22`, 'GET', null, { accessToken: user.accessToken });
                
                if (likesForPost.length > 0) {
                    const likeId = likesForPost[0]._id;
                    await request(`/data/likes/${likeId}`, 'DELETE', null, { accessToken: user.accessToken });
                    
                    setLikedPostsIds(prevIds => prevIds.filter(id => id !== postId));
                }
            } catch (error) {
                console.error("Error unliking post:", error);
                throw error; 
            }

        } else {
          
            try {

                const newLike = { postId };
                await request('/data/likes', 'POST', newLike, { accessToken: user.accessToken });

                setLikedPostsIds(prevIds => [...prevIds, postId]);

            } catch (error) {
                console.error("Error liking post:", error);
                throw error; 
            }
        }
    }

    const userContextValues = {
        loginHandler,
        registerHandler,
        logoutHandler,
        likeHandler,
        isAuthenticated,
        user,
        likedPostsIds, 
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;