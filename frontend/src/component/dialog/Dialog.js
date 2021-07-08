import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getApp,updateApp} from '../helper/apihelper'
import { isAuthenticated } from '../auth'
import {toast} from 'react-toastify'

const {data} = isAuthenticated();

export default function FormDialog({apkid}) {
  const [open, setOpen] = React.useState(false);
  const [Values, setValues] = useState({
    title:"",
    description:"",
    apptype:"",
    category:'',
    email:"",
    website:"",
    screenshots:"",
    icons:"",
    apkpath:"",
    releasename:"",
    whatisnew:"",
    loading:false,
    error:"",
    appid:"",
    formData:""
})

const {title,description,appid,apptype,category,email,website,screenshots,icons,apkpath,releasename,whatisnew,loading,error,getRedirected,formData} = Values;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit =(e)=>{
    
    setValues({...Values,loading:true})
      console.log(Array.from(formData));
      updateApp(data.token,data.id,e,formData).then((data)=>{
        // console.log(data);
        toast("Updated Succesfully",{type:"success"})
        setValues({...Values,loading:false})
      }).catch((e)=>{
        toast("Failed to update",{type:"error"})
        setValues({...Values,loading:false})

        console.log(e);
      })

  }

  const handleChange = name => event => {
    let value;

    if(name === "screenshots" || name=== "icons" ||name ==="apkpath")
      {
        console.log(event.target.files);
         value= event.target.files[0];
      }
      else{
         value= event.target.value;
      }

    
   console.log(value);
    formData.set(name,value);
    setValues({...Values,[name]:value})         
        }


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Upload new APK
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Versions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New version should be greater than the latest version
          </DialogContentText>
          <form action="">
          <TextField
          onChange={handleChange("apkpath")}
            autoFocus
            margin="dense"
            id="name"
            type="file"
            name="apkpath"
            fullWidth
            InputLabelProps={{
              shrink:true
            }}

          />

          <TextField
          onChange={handleChange("releasename")}
            autoFocus
            margin="dense"
            id="name"
            label="Version no"
            type="text"
            name="releasename"
            fullWidth
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit(apkid)} color="primary">
            YES
          </Button>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
