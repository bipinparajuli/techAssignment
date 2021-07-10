import React,{useState} from 'react'
import {signup} from "../auth/index"
import {useHistory,Link} from "react-router-dom"
import {Button,TextField,InputAdornment} from "@material-ui/core"
// import {authenticate} from '../auth/index'
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useStateValue} from '../context/ServiceProvider'
 


const Signin = () => {

    const [{},dispatch] = useStateValue()
    const [state,setstate] = useState(
       {

        email:"",
       password:"",
       username:"",
       confirm:"",
       emailerror:false,
       passworderror:false,
       usernameerror:false,
       confirmerror:false,
       confirmerrortext:"",
       usernameerrortext:"",
       emailerrortext:"",
       passworderrortext:"",

       error:""

        }
    );

console.log("State");    
    
   const history =  useHistory();

   const {confirm,confirmerror,confirmerrortext,email,password,username,emailerror,passworderror,emailerrortext,passworderrortext,error,usernameerror,usernameerrortext} = state;


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

        const changeUserHandler = (user) => {
console.log(user);
            setstate({...state,username:user})
    
            // var regx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    
            if(username.length <= 1)
            {
                setstate({...state,usernameerror:true,usernameerrortext:"User is required",username:user})
            
            }
            else if( username.length <= 6)
            {
                setstate({...state,usernameerror:true,usernameerrortext:"At least 6 characters",username:user})
            
            }
            else{
                setstate({...state,usernameerror:false,usernameerrortext:"",username:user})
            }
        } 
    
        const confimHandler = (cpassword) => {
            if(password !== cpassword)
            {
                setstate({...state,confirmerror:true,confirmerrortext:"Password not match",confirm:cpassword})
            }
            else{
                setstate({...state,confirmerror:false,confirmerrortext:"",confirm:cpassword})

            }
        }
        
        
const SignUp = (e) =>{

    console.log(email);
//navigating to storage    
signup({email,password,username}).then((data)=>{

    history.push("/")
  
}).catch(err=>console.log("Server Error"))
}



    return (
        <div className="container signup">
           
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
                    <h1>Sign up here</h1>

<form action="">
<TextField
            name="username"
            value={username}
          error={usernameerror}
          id="standard-error-helper-text"
          label="Username"
          placeholder="Enter username"
          helperText={usernameerrortext}
          onChange={(e)=>changeUserHandler(e.target.value)}
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

<TextField
          error={confirmerror}
          id="standard-error-helper-text"
          label=" Confirm Password"
          placeholder="Enter password"
          InputProps={{
            startAdornment: (
              <InputAdornment style={{position:"absolute",left:"160px"}} >
                <LockOpenIcon />
              </InputAdornment>
            ),
          }}

        //   defaultValue="test@"
          helperText={confirmerrortext}
          onChange={e=>confimHandler(e.target.value)}
        />


<br/>
<br/>

<Button 
style={{borderRadius:"20px",width:"77%"}}
variant="contained" color="primary"
 onClick={()=>SignUp()}
 >
     Signup
</Button><br /><br />
</form>

<strong className="question" >Already have an Account? <Link className="question" to="/">SIgn in</Link></strong>
                    </div>
                </div>
            
            </div>
          
        </div>
    )
}

export default Signin


