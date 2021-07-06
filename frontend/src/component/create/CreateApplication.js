import React,{useState} from 'react'
import './CreateApplication.css'
import {TextField,Select,MenuItem,InputLabel,Button} from '@material-ui/core'
// import {DropzoneArea} from 'material-ui-dropzone'
import {createApp} from '../helper/apihelper'
import Navbar from '../Home/Navbar/Navbar'
import {toast} from "react-toastify"
import { isAuthenticated } from '../auth'

const {data} = isAuthenticated() 

const CreateApplication = () => {
// console.log(data);
  const [loading, setloading] = useState(false)
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
        error:"",
        formData:new FormData()
    })

const {title,description,apptype,category,email,website,screenshots,icons,apkpath,releasename,whatisnew,error,getRedirected,formData} = Values;

    const handleSubmit =(e)=>{
        e.preventDefault();
        setloading(true)
        console.log(Values);
        createApp(data.id,data.token,formData).then((data)=>{
          if(data == undefined)
          {
            setloading(false)
         return toast("Failed to create",{type:"error"})
            
          }
          toast("Create Successfully",{type:"success"})
        setloading(false)

          console.log(data);
        }).catch((e)=>{
          toast("Failed to create",{type:"error"})
          setloading(false)

          console.log(e);
        })

    }
    
    const handleChange = name => event => {
        console.log("Changing",name,event.target.value);
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
<>
      <Navbar />
        <div className="container">

        <form className="create-app">
          
          <div className=" app product-details">

        <h2>Product Details</h2>

            <TextField
          id="standard-full-width"
          label="Title *"
          style={{ margin: 8 }}
          placeholder="Ex: Instagram"
          fullWidth
          margin="normal"
            onChange={handleChange("title")}
        />

        <TextField
          id="standard-full-width"
          label="Description *"
          style={{ margin: 8 }}
          placeholder="Ex: This is a social media platform."
          fullWidth
          margin="normal"
          onChange={handleChange("description")}

        />


          </div>

          <div className="app categorization">
                <h2>Categorization</h2>
                <InputLabel id="demo-simple-select-label">Application Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                  value={apptype}
                  onChange={handleChange("apptype")}
                >
                <MenuItem value="application">Application</MenuItem>
                <MenuItem value="game">Game</MenuItem>
                </Select>

                <InputLabel id="demo-simple-select-label">Application Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                  value={category}
                  onChange={handleChange("category")}
                >
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
                </Select>
            </div>

            <div className="app contact-details">
            <h2>Contact Details</h2>

                <TextField
                id="standard-full-width"
                label="Email *"
                style={{ margin: 8 }}
                placeholder="Ex: example@gmail.com"
                fullWidth
                margin="normal"
              onChange={handleChange("email")}

                />

                <TextField
                id="standard-full-width"
                label="Website "
                style={{ margin: 8 }}
                placeholder="Ex: www.example.com"
                fullWidth
                margin="normal"
              onChange={handleChange("website")}

                />

            </div>

            <div className="app assets">
                <h2>Graphics Assets*</h2>
                
        
                {/* <input type="file" onChange={handleChange("screenshots")}  /> */}
{/* 
                <DropzoneArea
        onChange={handleChange("screenshots")}
        /> */}
{/* 
            <DropzoneArea
            onChange={()=>handleChange("icons")}

        /> */}
        <label >Choose Icon for app :  </label>
                <input type="file" onChange={handleChange("icons")}  />

            </div>

            <div className="app apk-bundle">
                <h2>APK to add</h2>

                
            {/* <DropzoneArea
            onChange={()=>handleChange("apkfile")}
         
         /> */}

        <label >Choose APK file :  </label>

                <input type="file" onChange={handleChange("apkpath")}  />

            </div>

            <div className="app release-info">
              <h2>Release Information</h2>
                
              <TextField
          id="standard-full-width"
          label="Release name *"
          style={{ margin: 8 }}
          placeholder="Ex: 1.0"
          fullWidth
          margin="normal"
        onChange={handleChange("releasename")}
        />

        <TextField
          id="standard-full-width"
          label="What is new? *"
          style={{ margin: 8 }}
          placeholder="Ex: Fixed issue on Submit button."
          fullWidth
          margin="normal"
          onChange={handleChange("whatisnew")}

        />
            </div>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {
                loading ? "creating . . ." : "Create Application"
              }
                
            </Button>
              
        </form>

        </div>
</>
    )
}

export default CreateApplication
