import React from 'react'
import Typography from '@material-ui/core/Typography';
import {TextField,Select,MenuItem,InputLabel,Button,makeStyles} from '@material-ui/core'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },
// }));


const CreateApplication = () => {

  // const classes = useStyles();

  return (
    <div  className="createapplication">
      <div className="form-container">

<Typography variant="h5">
New Project
</Typography>
  <form action="" className="create-form">
  <input
        accept="image/*"
        // className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        hidden
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained"  component="span">
          Browse
        </Button>
      </label>
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

       
<Button style={{borderRadius:"20px"}} color="primary" variant="contained">
  Submit
</Button>

  </form>   
  </div>
      
    </div>
  )
}

export default CreateApplication
