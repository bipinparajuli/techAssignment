import React,{useState} from 'react'
import {signin} from "../auth/index"
import {useHistory,Link} from "react-router-dom"
import {Button,TextField,InputAdornment} from "@material-ui/core"
import {authenticate} from '../auth/index'
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useStateValue} from '../context/ServiceProvider'
 


const Signin = () => {

    const [{},dispatch] = useStateValue()
    const [state,setstate] = useState(
       {

        email:"",
       password:"",
       emailerror:false,
       passworderror:false,
       emailerrortext:"",
       passworderrortext:"",
       error:""

        }
    );

console.log("State");    
    
   const history =  useHistory();

   const {email,password,emailerror,passworderror,emailerrortext,passworderrortext,error} = state;


const changeEmailHandler = (email) => {

     setstate({...state,email:email})
    
        if (! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
        {
            setstate({...state,emailerror:true,emailerrortext:"Email is invalid",email:email})
        }

        else{
            setstate({...state,emailerror:false,emailerrortext:"",email:email})
            
        }
  
    }

    const changePasswordHandler = (password) => {

            setstate({...state,password:password})
    
            // var regx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    
            if(password.length <= 1)
            {
                setstate({...state,passworderror:true,passworderrortext:"Password is required",password:password})
            
            }
            else if( password.length <= 6)
            {
                setstate({...state,passworderror:true,passworderrortext:"At least 6 characters",password:password})
            
            }
            else{
                setstate({...state,passworderror:false,passworderrortext:"",password:password})
            }
        }
    
        
const SignIn = (e) =>{

    console.log(email);
//navigating to storage    
signin({email,password}).then((data)=>{
  
    console.log(data);
if(data.success)
{
    
authenticate(data,()=>{
    dispatch({
        type:"SNACK",
        item:true
    })
    history.push("/home")
}).catch(err=>console.log("Server Error"))
}

else{
  setstate({...state,error:data.messege})
}



})
.catch((err)=>console.log(err))
    
}

    return (
        <div className="container">
           
            <div className="row">
                <div className="col-1">
                    <div>
                        <h1>Welcome to App Store clone</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda accusantium ipsum sapiente quae unde totam corrupti neque amet delectus recusandae?</p>
                    </div>
                </div>

                <div className="col-2">
                    <div>
                        <strong style={{color:"red"}}>{error}</strong>
                    <h1>Sign in here</h1>

<form action="">
<TextField
            name="email"
            value={email}
          error={emailerror}
          id="standard-error-helper-text"
          label="Email"
          placeholder="Enter email"
          helperText={emailerrortext}
          onChange={(e)=>changeEmailHandler(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment style={{position:"absolute",left:"160px"}} >
                <EmailIcon  />
              </InputAdornment>
            ),
          }}
        />
 
<br/>
<br/>
<TextField
          error={passworderror}
          id="standard-error-helper-text"
          label="Password"
          placeholder="Enter password"
          InputProps={{
            startAdornment: (
              <InputAdornment style={{position:"absolute",left:"160px"}} >
                <LockOpenIcon />
              </InputAdornment>
            ),
          }}

        //   defaultValue="test@"
          helperText={passworderrortext}
          onChange={e=>changePasswordHandler(e.target.value)}
        />

<br/>
<br/>

<Button 
style={{borderRadius:"20px",width:"77%"}}
variant="contained" color="primary"
 onClick={()=>SignIn()}
 >
     Login
</Button><br /><br />
</form>

<strong className="question" >New Account? <Link className="question" to="/signup">SIgn up</Link></strong>
                    </div>
                </div>
            
            </div>
          
        </div>
    )
}

export default Signin


