const Appdata = require("../model/appdata");
const formidable = require("formidable");
const fs = require("fs");
const {BlobServiceClient} = require("@azure/storage-blob")
let _ = require("lodash");
let {uuid} = require("uuidv4")


//connection string
            //azure connection string
            const AZURE_STORAGE_CONNECTION_STRING ="DefaultEndpointsProtocol=https;AccountName=csg100320015854bffe;AccountKey=9JtphJ93nUO2gRiVKaYDp07HHhgM6h6RDTPsJP2JFAuF0zqZP8l6viXz5dubww4dspCR0D2yO73urZNaAv7qcw==;EndpointSuffix=core.windows.net"

              // Create the BlobServiceClient object which will be used to create a container client
           const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

            // Blob Storage

            // console.log(AZURE_STORAGE_CONNECTION_STRING);

           
//Setting App according to ID
exports.getAppById = (req,res,next,id)=>{
  Appdata.findById(id).then((app)=>{
    req.app = app
    console.log(req.app);
    next();
  }).catch(e=>{
    console.log(e);
    return res.status(400).json({
      error: "App data not found"
    });
  })
}

//Setting App according to title

exports.getAppByTitle = (req,res,next,title) => {
const regx = new RegExp(title,'i')

    Appdata.find({title:regx},(err,app)=> {
if(err)
{
    res.status(403).json({error:"Could not find App by title"})
}
req.apptitle = app
next();
})
}


//get single App

exports.getApp = async (req,res) => {
  // req.app.icons = undefined;
  // req.app.screenshots = undefined;
  console.log('\nListing blobs...');

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
      console.log('\t', blob.name);
  }
  return res.json(req.app);
}


//middleware
exports.photo = (req, res, next) => {
  // console.log(req.app.icons);
  // if (req.app.screenshots.data) {
  //   res.set("Content-Type", req.app.screenshots.contentType);
  //   return res.send(req.app.screenshots.data);
  // }
   if (req.app.icons.data) {
    res.set("Content-Type", req.app.icons.contentType);
    return res.send(req.app.icons.data);
  }

  next();
};

//search

exports.searchApp =(req,res) => {

    res.json(req.apptitle)
    
}

//creating app 
exports.createApp = async (req,res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req, (err, fields, file) => {
      
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      
      
    if(file.apkpath.type == "application/vnd.android.package-archive")
    {
      
           var path = fs.readFileSync(file.apkpath.path);
     
    }
      //destructure the fields
      const { title,apkpath,packageurl,releasename, } = fields;
  

      if (!title || !releasename ||  !packageurl) {
        return res.status(400).json({
          error: "Please include all fields",
          success:false
        });
      }

      let app= new Appdata({...fields});
  
      //save to the DB
      app.save((err, app) => {
        // console.log(app,"SAVING");
         
          if (err) {
         console.log(err);
            res.status(400).json({
              error: "Saving app in DB failed"
            });
          }
         
           // Create a unique name for the container
           const containerName = app._id;

           console.log('\nCreating container...');
           console.log('\t', containerName);

           // Get a reference to a container
           const containerClient = blobServiceClient.getContainerClient(containerName);

           console.log(containerClient);

           const createContainerResponse =  containerClient.create();
           console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);

          // Create a unique name for the blob
          const blobName = 'blob' + uuid() + '.apk';

          // Get a block blob client
          const blockBlobClient = containerClient.getBlockBlobClient(blobName);

          console.log('\nUploading to Azure storage as blob:\n\t', blobName);

          // Upload data to the blob
          blockBlobClient.upload(path,path.length).then(uploadBlobResponse=>{
            console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse);
          }).catch((e)=>console.log(e));
                  
          
          
          res.json({status:200,success:true,data:app,messege:["API IS WORKING"]});
        });
    
   
      //handle file here
      // if (file.icons) {
      //   if (file.icons.size > 3000000) {
      //     return res.status(400).json({
      //       error: "File size too big!"
      //     });
      //   }


      //   app.icons.data = fs.readFileSync(file.icons.path);
      //   app.icons.contentType = file.icons.type;
      // }
  
      
    });

}

//updating app
exports.updateApp = async (req,res) => {
 
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    console.log(file);
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updation code
    let app = req.app;


    //handle file here
    if (file.icons) {

      if (file.icons.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      
      app.icons.data = fs.readFileSync(file.icons.path);
      app.icons.contentType = file.icons.type;

      console.log("Updated");
    }
    // update apk here;
    let filepath;
if(file.apkpath){

    if(file.apkpath.type == "application/vnd.android.package-archive")
      {
        
             filepath =`./uploads/${file.apkpath.name}`;
            

             let path = fs.readFileSync(file.apkpath.path);
      
       
               fs.writeFile(filepath,path,(data)=>{
                   console.log("updated success");
               })
        
      }
    app = _.extend(app, fields,{apkpath:filepath});

    }
    else{
    app = _.extend(app, fields);

    }


// console.log(app);

    //save to the DB
    app.save((err, app) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          error: "Updation of app failed",
          success:false,
          messege:["API is not working"]
        });
      }
      res.json({success:true,data:app,status:200});
    });
  });
}

//get all app
exports.getAllApp =  (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Appdata.find()
    // .select("-photo")
    // .populate("category")
    .sort([[sortBy, "asc"]])
    // .limit(limit)
    .exec((err, apps) => {
      console.log(apps);
      if (err) {
        return res.status(400).json({
          error: "NO APP FOUND"
        });
      
      }
      else{
     return res.json({success:true,data:apps,status:200});

      }
      // console.log(apps[0]._id);

      // Get a reference to a container
      const containerClient = blobServiceClient.getContainerClient(apps[0]._id);

      console.log("CONTAINER CLIENT",containerClient);

      // List the blob(s) in the container.
      for (const blob of containerClient.listBlobsFlat()) {
        console.log('\t', blob.name);
    }

      res.json(apps);
    });

}

//deleting app
exports.deleteApp = async (req,res) => {
  let app = req.app;
  console.log(app);
  //Deleting APK
  fs.unlink(req.app.apkpath, function (err) {
    // if (err) throw err;

    console.log(err);

    console.log('File deleted!');
  });

  app.remove((err, deletedApp) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the app"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedApp
    });
  });
}


