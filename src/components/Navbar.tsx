import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"

export const Navbar = () => {

    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const signUserOut = async () => {
        await signOut(auth)
        navigate('/login')
    }

    return <div className="flex justify-end items-center bg-purple-800 py-10 px-10">
        <div className="text-white font-semibold underline">
            <Link className="px-5 active:text-black" to="/">HOME</Link>
            {
                user ?
                    <Link className="px-5 active:text-black" to="/createPost">CREATE POST</Link>
                :
                    <Link className="px-5 active:text-black" to="/login">LOGIN</Link>
            }
       </div>

        <div className="flex text-white items-center">
            <p className="px-3">{user?.displayName}</p>
            {user?.photoURL && <img src={user?.photoURL || ''} className="h-9 w-9 rounded-full" alt="" />}
            {user?.displayName && <button onClick={signUserOut} className="px-3 bg-slate-200 border-2 border-slate-300 text-black mx-3 font-semibold">log Out</button>}
        </div>
    </div>
}