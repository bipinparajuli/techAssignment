import React from 'react'
import Typography from '@material-ui/core/Typography';
import {TextField,Select,MenuItem,InputLabel,Button} from '@material-ui/core'
const CreateApplication = () => {
  return (
    <div  className="createapplication">
<Typography variant="h5">
New Project
</Typography>
  <form action="" className="create-form">
  <TextField 
  id="standard-basic"
   type="file"
   margin="normal"
   
   />


  <TextField
          label="App Name"
          style={{ margin: 8 }}
          placeholder="Ex: This is a social media platform."
          margin="normal"
          // onChange={handleChange("description")}

        />

        
  <TextField
          label="Package URL "
          style={{ margin: 8 }}
          placeholder="Ex: This is a social media platform."
          margin="normal"
          // onChange={handleChange("description")}

        />

        
  <TextField
          label="Version No."
          style={{ margin: 8 }}
          placeholder="Ex: This is a social media platform."
          margin="normal"
          // onChange={handleChange("description")}

        />

       
<Button color="primary" variant="contained">
  Submit
</Button>

  </form>   
      
    </div>
  )
}

export default CreateApplication
