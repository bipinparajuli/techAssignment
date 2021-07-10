import React,{useState,useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import {TextField,Button,InputAdornment} from '@material-ui/core'
import {createApp} from '../helper/apihelper'
import {toast} from 'react-toastify'
import { isAuthenticated } from '../auth'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const {data} = isAuthenticated()


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CreateApplication = () => {

  // const classes = useStyles();

  const [loading, setloading] = useState(false)
    const [Values, setValues] = useState({
        title:"",
        packageurl:"",
        apkpath:"",
        releasename:"",
        error:"",
        titleerror:false,
        titleerrortext:"",
        packageurlerror:false,
        packageurlerrortext:"",
        releasenameerror:false,
        releasenameerrortext:"",
        isSuccess:false,
        formData:new FormData()
    })

const {isSuccess,title,packageurl,apkpath,releasename,error,getRedirected,formData,titleerror,titleerrortext,packageurlerror,packageurlerrortext,releasenameerror,releasenameerrortext} = Values;

//Handling form submission
const handleSubmit =(e)=>{
  e.preventDefault();
  setloading(true)
  createApp(data.id,data.token,formData).then((data)=>{
  console.log(data);

    if(data == undefined || !data.success)
    {
      console.log("I");
      setloading(false)
      setValues({...Values,title:""})
   return toast("Failed to create",{type:"error"})
      
    }
    setloading(false)
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    )
   return setValues({...Values,isSuccess:true})

  }).catch((e)=>{
    toast("Failed to create",{type:"error"})
    setloading(false)

    console.log(e);
  })

}

//Handling change in form
const handleChange = name => event => {
  
  
  

  console.log(name,event.target.value.length);
  
  if(name == "title" && event.target.value.length < 3)
  {
    setValues({...Values,titleerror:true,titleerrortext:"At least 3 char",title:event.target.value})
  }

  else{
    
    setValues({...Values,[name]:title,titleerror:false,titleerrortext:"",title:event.target.value})
    formData.set(name,event.target.value);
  }
//Package url
  if(name == "packageurl")
  {
            // var regx = new RegExp("/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}");
           let regx = /^([a-zA-Z0-9]{2,4})+\.([a-zA-Z0-9_\.\-])+\.(([a-zA-Z0-9\-]))+$/;
    if(! regx.test(event.target.value))
    {
    setValues({...Values,packageurlerror:true,packageurlerrortext:"Package url not valid",packageurl:event.target.value})
    }


  else{
    setValues({...Values,[name]:packageurl,packageurlerror:false,packageurlerrortext:"",packageurl:event.target.value})
    formData.set(name,event.target.value);
  }

  }
  //Release name
  if(name == "releasename")
  {
            var regx = new RegExp("^([0-9])\.([0-9])\.([0-9])");

    if(! regx.test(event.target.value))
    {
    setValues({...Values,releasenameerror:true,releasenameerrortext:"Version no. is invalid",releasename:event.target.value})
    }


  else{
    setValues({...Values,[name]:releasename,releasenameerror:false,releasenameerrortext:"",releasename:event.target.value})
    formData.set(name,event.target.value);
  }

  }
    if(name ==="apkpath")
      {
        // console.log(event.target.files);
    formData.set(name,event.target.files[0]);

        //  value= event.target.files[0];
      }
    
    
           
    }

//Handling Snake bar
    const handleClose = () => {
      setValues({ ...Values, isSuccess: false });
      
    };


  return (
    <div  className="createapplication">
      <div className="form-container">

<Typography variant="h5">
New Project
</Typography>
  <form action="" className="create-form">
  <input
        // accept="image/*"
        // className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        hidden
          onChange={handleChange("apkpath")}

      />
      <label htmlFor="contained-button-file">
        <Button variant="contained"  component="span">
          Browse
        </Button>
      </label>
  <TextField
          label="App Name"
          style={{ margin: 8 }}
          placeholder="Ex: test"
          margin="normal"
          error={titleerror}
          helperText={titleerrortext}
          onChange={handleChange("title")}
          
          InputProps={{
            startAdornment: (
              <InputAdornment style={{position:"absolute",left:"160px"}} >
                <LockOpenIcon />
              </InputAdornment>
            ),
          }}

        />

        
  <TextField
          label="Package URL "
          style={{ margin: 8 }}
          placeholder="Ex: com.company.appname"
          margin="normal"
          onChange={handleChange("packageurl")}
          error={packageurlerror}
          helperText={packageurlerrortext}
        />

        
  <TextField
          label="Version No."
          style={{ margin: 8 }}
          placeholder="Ex: This is a social media platform."
          margin="normal"
          onChange={handleChange("releasename")}
          error={releasenameerror}
          helperText={releasenameerrortext}

        />

       
<Button style={{borderRadius:"20px"}} color="primary" variant="contained" onClick={handleSubmit}>
{loading? "Submitting ... ": " Submit"}
</Button>

  </form>   
  </div>
  <Snackbar
        color="primary"
        autoHideDuration={6000}
        open={isSuccess}
        onClose={handleClose}
        message="Successfully saved the project"
      >
 <Alert 
 onClose={handleClose}
  severity="info">
Successfully saved the project
  </Alert>
          </Snackbar>
    </div>
  )
}

export default CreateApplication
