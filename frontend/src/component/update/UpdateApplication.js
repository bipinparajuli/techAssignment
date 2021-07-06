import React,{useState,useEffect} from 'react'
import './UpdateApplication.css'
import {TextField,Select,MenuItem,InputLabel,Button} from '@material-ui/core'
import {DropzoneArea} from 'material-ui-dropzone'
import {getApp,updateApp} from '../helper/apihelper'
import Navbar from '../Home/Navbar/Navbar'
import  {toast} from "react-toastify"
import { isAuthenticated } from '../auth'

const {data}= isAuthenticated();

const UpdateApplication = ({match}) => {

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
            

            useEffect(()=>{
                console.log(match.params.appId);

                getApp(match.params.appId).then((data)=>{
                   console.log(data);
                    setValues({...Values,
                        title:data.title,
                        description:data.description,
                        email:data.email,
                        website:data.website,
                        releasename:data.releasename,
                        whatisnew:data.whatisnew,
                        // apkpath:data.apkpath,
                        appid:data._id,
                       formData: new FormData()
                        // formData:new FormData()
                    })
                }).catch(err=>console.log(err))
            },[])


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
            value={title}
            name="title"
        />

        <TextField
          id="standard-full-width"
          label="Description *"
          style={{ margin: 8 }}
          placeholder="Ex: This is a social media platform."
          fullWidth
          margin="normal"
          onChange={handleChange("description")}
          value={description}
          name="description"


        />


          </div>

          <div className="app categorization">
                <h2>Categorization</h2>
                <InputLabel id="demo-simple-select-label">Application Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                  // value={apptype}
                  name="apptype"
                  onChange={handleChange("apptype")}
                >
                <MenuItem value="application">Application</MenuItem>
                <MenuItem value="game">Game</MenuItem>
                </Select>

                <InputLabel id="demo-simple-select-label">Application Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                  // value={category}
                  name="category"
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
          value={email}
          name="email"

                />

                <TextField
                id="standard-full-width"
                label="Website "
                style={{ margin: 8 }}
                placeholder="Ex: www.example.com"
                fullWidth
                margin="normal"
              onChange={handleChange("website")}
          value={website}
          name="website"
                />

            </div>

            <div className="app assets">
                <h2>Graphics Assets*</h2>
                
        
                {/* <input type="file" onChange={handleChange("screenshots")} name="screenshots"  /> */}
{/* 
                <DropzoneArea
        onChange={handleChange("screenshots")}
        /> */}
{/* 
            <DropzoneArea
            onChange={()=>handleChange("icons")}

        /> */}

                <label >Choose Icon for app :  </label>

                <input type="file" onChange={handleChange("icons")}  name="icons" />

            </div>

            <div className="app apk-bundle">
                <h2>APK to add</h2>

                
            {/* <DropzoneArea
            onChange={()=>handleChange("apkfile")}
         
         /> */}
                <label >Choose APK :  </label>

                <input type="file" onChange={handleChange("apkpath")}  name="apkpath" />

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
        value={releasename}
        name="releasename"
        
        />

        <TextField
          id="standard-full-width"
          label="What is new? *"
          style={{ margin: 8 }}
          placeholder="Ex: Fixed issue on Submit button."
          fullWidth
          margin="normal"
          onChange={handleChange("whatisnew")}
        value={whatisnew}
         name="whatisnew"
        />
            </div>

            <Button variant="contained" color="primary" onClick={()=>handleSubmit(appid)}>
              
            {
                loading ? "updating . . ." : "Update Application"
              }
                           </Button>
              
        </form>

        </div>
        </>

    )
}

export default UpdateApplication
