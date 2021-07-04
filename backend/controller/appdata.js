const Appdata = require("../model/appdata");
const formidable = require("formidable");
const fs = require("fs");


//Setting App according to ID
exports.getAppById = (req,res,next,id)=>{
  console.log(id);
  Appdata.findById(id).then((app)=>{
    req.app = app
    next();
  }).catch(e=>{
    console.log(e);
    return res.status(400).json({
      error: "App data not found"
    });
  })
}

//saving app to database
exports.createApp = async (req,res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
      const { title, description, apptype, releasename, email,category } = fields;
  
      if (!title || !description || !apptype || !category ||  !email) {
        return res.status(400).json({
          error: "Please include all fields"
        });
      }
  
      let product={};

      let filepath;

      if(file.apkpath.type == "application/vnd.android.package-archive")
      {
        
             filepath =`./uploads/${file.apkpath.name}`;
            

             let path = fs.readFileSync(file.apkpath.path);
      
       
               fs.writeFile(filepath,path,(data)=>{
                   console.log("filewritten success");
               })
        
      }


      

      product= new Appdata({fields,apkpath:filepath});
      //handle file here
      if (file.screenshots) {
        if (file.screenshots.size > 3000000 || file.icons.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }


        product.screenshots.data = fs.readFileSync(file.screenshots.path);
        product.screenshots.contentType = file.screenshots.type;

        product.icons.data = fs.readFileSync(file.icons.path);
        product.icons.contentType = file.icons.type;
      }
      console.log(product.apkpath);
  
      //save to the DB
      product.save((err, product) => {
      console.log("SAVING");
       
        if (err) {
       console.log(err);
          res.status(400).json({
            error: "Saving tshirt in DB failed"
          });
        }
        res.json(product);
      });
    });

}

//updating app
exports.updateApp = async (req,res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //updation code
    let app = req.app;
    app = _.extend(app, fields);

    //handle file here
    if (file.photo) {
      if (file.screenshots.size > 3000000 || file.icons.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.screenshots.data = fs.readFileSync(file.screenshots.path);
      product.screenshots.contentType = file.screenshots.type;

      product.icons.data = fs.readFileSync(file.icons.path);
      product.icons.contentType = file.icons.type;
    }
    // update apk here;

    if(file.apkpath.type == "application/vnd.android.package-archive")
      {
        
             filepath =`./uploads/${file.apkpath.name}`;
            

             let path = fs.readFileSync(file.apkpath.path);
      
       
               fs.writeFile(filepath,path,(data)=>{
                   console.log("updatedsuccess success");
               })
        
      }

    let  product= new Appdata({fields,apkpath:filepath});


    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed"
        });
      }
      res.json(product);
    });
  });
}

//get all app
exports.getApp = async (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 5;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  appdata.find()
    // .select("-photo")
    // .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      console.log(products.length);
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(products);
    });

}

//deleting app
exports.deleteApp = async (req,res) => {
  let app = req.app;
  
  //Deleting APK
  fs.unlink(req.app.apkpath, function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });

  app.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct
    });
  });
}


