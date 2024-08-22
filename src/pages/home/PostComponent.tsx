import React, { useEffect, useState } from 'react'
import './PostComponent.css'
import { post } from './Home'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
    eachPost : post
}

interface like {
    userId: string;
    likeId: string;
}

const PostComponent = (props: Props) => {
    const [user] = useAuthState(auth)
    const { eachPost } = props
    const [likes, setLikes] = useState<like[] | null>(null)
    
    const likesRef = collection(db, "likes")

    const likesDoc = query(likesRef, where("postId", "==", eachPost.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })) as like[])
        console.log(likes);
    }

    const addLike = async () => {
        try {
          const newDoc = await addDoc(likesRef, {
        postId: eachPost.id,
        userId: user?.uid
      })
        if (user) {
            setLikes((prev) => 
                prev
                    ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                    : [{userId: user.uid, likeId: newDoc.id}]
            )
            }
        } catch (err) {
            console.log(err);
     }
    }

    const removeLike = async () => {
        try {
        const deleteLikeQuery = query(likesRef,
            where("postId", "==", eachPost.id),
            where("userId", "==", user?.uid)
        )

        const deleteLikeData = await getDocs(deleteLikeQuery)
        const deleteLike = doc(db, "likes", deleteLikeData.docs[0].id)
        await deleteDoc(deleteLike)

         if (user) {
             setLikes(
                 (prev) => prev && prev.filter((like) => like.likeId !== deleteLikeData.docs[0].id) 
            )
            }
        } catch (err) {
            console.log(err);
     }
    }

    const hasLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, [])
    

  return (
      <div className='post-container'>
          <div className='post-header'>
              <h1>{eachPost.title}</h1>
          </div>

          <div className='post-description'>
              <p>{eachPost.description}</p>
          </div>

          <div className='post-actions'>
              <p className='post-username'>@{eachPost.username}</p>  
              <button onClick={hasLiked ? removeLike : addLike}>
                  {hasLiked ? <>&#128078;</> : <>&#128077;</>}
              </button>
              {likes && <p className='like-count'>Likes: {likes.length}</p>}
          </div>
    </div>
  )
}

export default PostComponent
