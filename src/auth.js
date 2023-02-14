import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {React, useState} from 'react';
import { auth } from './config/firebase';

const Auth = () => {

const [email, setEmail] = useState("");
const [password,setPassword] = useState("");
const [isAuth, setIsAuth] = useState(false);

const signUp = async  () => {
    try{
        await createUserWithEmailAndPassword(auth, email, password); 
    } catch(err){
        console.error(err)
    }
};

const signIn = async () => {
    try{
         await signInWithEmailAndPassword(auth, email, password);
        setIsAuth(true)
    }catch(err){
        console.error(err)
    } 
}

const logout = async () => {
    try{
        await signOut(auth); 
        setIsAuth(false)
    }catch(err){
        console.error(err)
    }
}

  return (
    <div>
        <input placeholder="Email..." onChange={(event)=>{
            setEmail(event.target.value)
        }}/>
        <input placeholder="Password..." onChange={(event)=>{
            setPassword(event.target.value)
        }}/>

        <button onClick={signIn}>Sign in</button>   
        <button onClick={signUp}>Sign up</button>
        {isAuth && <h1>User is Logged in</h1>}

        <button onClick={logout}>Logout</button>  
    </div>
  )
}

export default Auth