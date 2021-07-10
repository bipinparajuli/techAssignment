import React,{useState,useEffect} from 'react'
import './UpdateApplication.css'
import {Button} from '@material-ui/core'
import {getApp,deletProduct} from '../helper/apihelper'
import Typography from '@material-ui/core/Typography';
import  {toast} from "react-toastify"
import { isAuthenticated } from '../auth'
import Dialog from "../dialog/Dialog"
import UpdateTable from '../Home/Table/UpdateTable'
import {useStateValue} from '../context/ServiceProvider'
import {useHistory} from 'react-router-dom'


const {data}= isAuthenticated();



const UpdateApplication = ({match}) => {

  const history = useHistory();

  const [{},dispatch] = useStateValue();
  const [updatedata,setUpdateData] = useState([])

    const [Values, setValues] = useState({
        title:"",
        apkpath:"",
        releasename:"",
        packageurl:"",
        loading:false,
        date:"",
        error:"",
        appid:"",
    })

const {title,appid,date,releasename,loading,packageurl} = Values;

    // const handleSubmit =(e)=>{
    
    //   setValues({...Values,loading:true})
    //     console.log(Array.from(formData));
    //     updateApp(data.token,data.id,e,formData).then((data)=>{
    //       // console.log(data);
    //       toast("Updated Succesfully",{type:"success"})
    //       setValues({...Values,loading:false})
    //     }).catch((e)=>{
    //       toast("Failed to update",{type:"error"})
    //       setValues({...Values,loading:false})

    //       console.log(e);
    //     })

    // }
    
    // const handleChange = name => event => {
    //     let value;

    //     if(name ==="apkpath")
    //       {
    //         console.log(event.target.files);
    //          value= event.target.files[0];
    //       }
    //       else{
    //          value= event.target.value;
    //       }

        
    //    console.log(value);
    //     formData.set(name,value);
    //     setValues({...Values,[name]:value})         
    //         }
            
            const deleteHandler = (rowid) => {
              deletProduct(data.token,data.id,rowid).then((data)=>{
                console.log(data);
              toast(data,{type:"success"})
              dispatch({
                type:"DELETE",
                item:true
              })
              history.push("/profile")
                // preload();
              })
              
    .catch(err=>toast("Failed to delete",{type:"error"}))
                          
            }

            const preload = () => {
              getApp(match.params.appId).then((data)=>{
                console.log("PRELOAD",data);
                dispatch({
                  type:"LENGTH",
                  item:data.nofoversion
                })
                
                setUpdateData(data)
               
                 setValues({...Values,
                     title:data.title,
                     releasename:data.releasename,
                     packageurl:data.packageurl,
                     date:data.createdAt,
                     appid:data._id,
                     loading:true,
                    formData: new FormData()
                 })
             }).catch(err=>console.log(err))
            }

            useEffect(()=>{

              preload();
              
            },[])


    return (
      <div className="update-application">
          <Typography variant="h4">
            {title}
          </Typography>

          <div className="update-area">
            <div className="left">
              <div className="apk">
                <Typography variant="h6" >
                    APK
                </Typography>
          
                <Dialog apkid={appid} />

              </div>

              <div className="current-apk">
                <Typography variant="h6" >
                   CURRENT APK
                </Typography>

                <Typography variant="p" >
                   published on : <span>{date.substr(0,10)}</span>
                </Typography>
                  
              </div>  
            </div>
            
            <div className="right">
            <Button variant="contained" onClick={()=>deleteHandler(appid)} >
               Delete Project
            </Button>
            </div>

          </div>

            <hr />
          <div className="package-area">

            <div className="package-name">
              <Typography variant="subtitle1" color="initial">
                Package name
              </Typography>

              <Typography variant="h6" color="initial">
              {packageurl}
              </Typography>
            </div>

            <div className="version">
            <Typography variant="subtitle1" color="initial">
                Version
              </Typography>

              <Typography variant="h6" color="initial">
                {releasename}
              </Typography>

            </div>

          </div>

          <hr />

          <div className="previous-apk">
          <Typography variant="h6" >
                   PREVIOUS APK
            </Typography>

            {loading ?<UpdateTable data={updatedata} /> :<strong>loading . . .</strong>}
            
          </div>
        </div>

    )
}

export default UpdateApplication
