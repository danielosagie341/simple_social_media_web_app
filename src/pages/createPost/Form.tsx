import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

const Form = () => {
  
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  
  const schema = yup.object().shape({
      title: yup.string().required("You must add a title"),
      description: yup.string().required("You must add a description"),
  })

  const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
      resolver: yupResolver(schema),
  });
  
  const postsRef = collection(db, "posts")

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid
    })
    
    navigate('/')
  }

  return (
      <form 
          onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onCreatePost)() 
          }} 
          className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto mt-10"
      >
          <h1 className="text-2xl font-bold text-gray-800 mb-5">Create a New Post</h1>
          
          <input 
              className={`w-full p-3 border-2 rounded-lg ${errors.title ? 'border-red-500' : 'border-gray-300'} mb-3`} 
              type="text" 
              placeholder="Title..." 
              {...register("title")} 
          />
          {errors.title && <p className="text-red-500 text-sm mb-3">{ errors.title?.message }</p>}
          
          <textarea 
              className={`w-full p-3 border-2 rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'} mb-3`} 
              placeholder="Description..." 
              {...register("description")} 
          />
          {errors.description && <p className="text-red-500 text-sm mb-3">{ errors.description?.message }</p>}
          
          <input 
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-600 transition-colors mb-3" 
              type="submit" 
              value="Create Post" 
          />
      </form>
  )
}

export default Form
