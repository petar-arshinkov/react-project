import { useEffect } from "react";
import Post from "./Post";
import { useState } from "react";

const BASE_API_URL = 'http://localhost:3030/jsonstore/blog/posts';

export default function Blog(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async ()=> {
            try {
                const response = await fetch(BASE_API_URL);
                const data = await response.json();
                console.log('Fetched blog posts:', data);
                setPosts(Object.values(data));
                
                
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
    })();
            
    }, []);

    return( <div className="pt-8 pb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Full Blog Catalog</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts.map(post => <Post key={post.id} {...post}/> )}
            </div>
        </div>);
}
