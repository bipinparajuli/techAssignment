const Appdata = require("../model/appdata");
const formidable = require("formidable");
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const appdata = require("../model/appdata");
const con = mongoose.Connection;


//CONNECTING MONGOOSE AND GRIDFS
Grid.mongo = mongoose.mongo

exports.getAppById = (req,res,id,next)=>{
  Appdata.findById(id).then((app)=>{
    req.app = app
    next();
  }).catch(e=>{
    return res.status(400).json({
      error: "App data not found"
    });
  })
}


exports.createApp = (req,res) => {

    con.once("open",()=>{
        console.log("Connection Open");

        let gfs = Grid(con.db);

        
    })

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
  
      let product = new Appdata(fields);
  
      //handle file here
      if (file.screenshots) {
        // if (file.screenshots.size > 3000000 || file.icons.size > 3000000) {
        //   return res.status(400).json({
        //     error: "File size too big!"
        //   });
        // }


        product.screenshots.data = fs.readFileSync(file.screenshots.path);
        product.screenshots.contentType = file.screenshots.type;
        product.icons.data = fs.readFileSync(file.icons.path);
        product.icons.contentType = file.icons.type;
      }
      // console.log(product);
  
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

exports.updateApp = (req,res) => {
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
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

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

exports.getApp = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  appdata.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND"
        });
      }
      res.json(products);
    });

}



exports.deleteApp = (req,res) => {
  let app = req.app;
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


