// import { stat } from 'fs';
import React,{useState} from 'react'
import {useHistory,Link} from "react-router-dom"
import {toast} from "react-toastify"
import {Button,TextField} from "@material-ui/core"
import {signup} from '../auth/index'

const Signup = () => {

 const [state,setstate]=useState({
     username:"",
    email:"",
    password:"",
    confirmpassword:""
})

const [error,seterror] = useState ({
    emailFormat:"",
    passwordFormat:"",
    confirmation:""
})

const {emailFormat,passwordFormat,confirmation} = error;

const {username,email,password,confirmpassword} = state;


const history = useHistory()


    const registerAccount = ()=> {

        //validation

        // email format

        if (! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
        {
            return seterror({
            emailFormat:"Please check your email format",
            passwordFormat:"",
            confirmation:""
            })

        }

        //password validation

        //password format
        var regx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

        if(! regx.test(password))
        {
            return seterror({
            emailFormat:"",
            passwordFormat:"password format don't match",
            confirmation:""
            })

        }


        //password confirmation
        if(password !== confirmpassword)
        {
        return seterror({
        emailFormat:"",
        passwordFormat:"",
        confirmation:"Password doesn't match"
            
            });
        }

        //saving data to Database

            signup(state).then((data)=>{
                toast("Registered successfully",{type:"success"})
                console.log(data);
            }).catch(err=>{
                toast("Failed in registration",{type:"error"})
            })

                history.push("/signin")


    }

    return (
        <div className="home">
            <div className="registration-form">
            <h1 style={{color:"#383CC1"}}>Register here <span style={{color:"#2827CC"}} className="animate__animated animate__flash animate__infinite">##</span></h1>

            <TextField required label="Username" variant="outlined" type="text" onChange={e=>setstate({...state,username:e.target.value})} />

            <br/><br/>

            {
                emailFormat? (
                <>
                <span style={{color:"red"}}>
                    {emailFormat}
                </span> <br/> <br/> 
                </>): ""
            }

            <TextField required label="Email" variant="outlined" type="email" onChange={e=>setstate({...state,email:e.target.value})} />

            <br/><br/>
            
            {
                passwordFormat ? (
                <>
                    <span style={{color:"red"}}>
                        {`${passwordFormat}`}
                    </span> <br/> <br/> 
                </>): ""
            }

            <TextField required label="Password" variant="outlined" type="password" onChange={e=>setstate({...state,password:e.target.value})} />

            <br/> <br/>
            {
                confirmation ? (
                <>
                    <span style={{color:"red"}}>
                        {`${confirmation}`}
                    </span> <br/> <br/> 
                </>): ""
            }

            <TextField required label="Confirm Password" variant="outlined" type="password" onChange={e=>setstate({...state,confirmpassword:e.target.value})} />

            <br/><br/>
            <Button variant="contained" color="primary" onClick={registerAccount}>Register</Button><br /><br />
                
            <strong>Already have <Link to="/signin">Account ?</Link></strong>
            </div>
        </div>
    )
}

export default Signup
