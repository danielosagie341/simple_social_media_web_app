import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result);
        navigate('/')
    }

    return <div className="flex flex-col items-center font-semibold">
        <h1 className="py-5">SIGN IN WITH GOOGLE TO CONTINUE</h1>
       
        <button onClick={signInWithGoogle} className="px-3 bg-slate-200 border-2 border-slate-300">sign in with google</button>
    </div>
}