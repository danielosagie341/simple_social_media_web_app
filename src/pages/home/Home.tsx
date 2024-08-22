import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import PostComponent from "./PostComponent";

export interface post {
    id: string;
    username: string;
    description: string;
    userId: string;
    title: string;
}

export const Home = () => {

    const [postsList, setPostsList] = useState<post [] | null>(null)
    const postRef = collection(db, "posts")

    const getPosts = async () => {
        const data = await getDocs(postRef)
        setPostsList(
            data.docs.map((doc) => ({...doc.data(), id: doc.id})) as post[]
        )
    }

    useEffect(() => {
      getPosts()
    }, [])
    

   return (
  <div>
    {postsList
      ?.slice() // Create a shallow copy of the array to avoid mutating the original array
      .reverse() // Reverse the copied array
      .map((post, index) => (
        <PostComponent key={index} eachPost={post} />
      ))}
  </div>
);

}