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
import {useStateValue} from '../context/ServiceProvider'

const {data} = isAuthenticated();

export default function FormDialog({apkid}) {
  
  const [{length},dispatch] = useStateValue();

  const [] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [Values, setValues] = useState({
    apkpath:"",
    releasename:"",
    loading:false,
    error:"",
    appid:"",
    releasenameerror:false,
    releasenameerrortext:"",
    formData:new FormData()
})

const {releasename,formData,releasenameerror,releasenameerrortext} = Values;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit =(e)=>{
    
    formData.set("nofoversion",length+1);
    console.log(data.token);

    setValues({...Values,loading:true})
      // console.log(Array.from(formData));
      updateApp(data.token,data.id,e,formData).then((data)=>{
        // console.log(data);

        if(! data.success){
        setValues({...Values,loading:false})
         return toast("Failed to update",{type:"error"})
        }
        dispatch({
          type:"UPDATE",
          item:data.data
        })
        setValues({...Values,loading:false})
          toast("Updated Succesfully",{type:"success"})
        
      }).catch((e)=>{
        toast("Failed to update",{type:"error"})
        setValues({...Values,loading:false})

        console.log(e);
      })

  }

  const handleChange = name => event => {
    let value;



    if(name ==="apkpath")
      {
        console.log(event.target.files);
         value= event.target.files[0];
         formData.set(name,value);
         setValues({...Values,[name]:value})
        }
      else{
        //Release name
            
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
            error={releasenameerror}
            helperText={releasenameerrortext}
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleSubmit(apkid)} color="primary">
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
