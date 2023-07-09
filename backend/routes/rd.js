const router = require('express').Router();
let RD = require('../models/DataRanking.model');
var express = require('express')
var multer = require('multer')
var path = require('path')
var bodyParser = require('body-parser')
var csv = require('csvtojson')
var app = express()
const {spawn} = require('child_process');

router.route('/rddata').get((req,res) => {
    RD.find()
    .then(rd => res.json(rd))
    .catch(err => res.status(400).json('Error:'+err));
});

// router.route('/rddata/:fil').get((req,res) =>{
//    let r = req.query.r;
//    let y = req.query.y;
//    let a = req.query.a;

// });

router.route('/len/:rank/:Year').get((req,res) => {
  RD.find({rank:req.params.rank,Year:req.params.Year})
  .then(rd=>res.json(rd.length))
  .catch(err=> res.status(400).json('Error: ' + err))
});
// router.route('/len/:rank/:Year/:IIITD').get((req,res) => {
//   if(req.params.rank!="ALL" && req.params.Year!="ALL" && req.params.IIITD!="ALL"){
//     RD.find({rank:req.params.rank,Year:req.params.Year,IIITD:req.params.IIITD})
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))
//   }
//   else if(req.params.rank!="ALL"&&req.params.Year!="ALL"&&req.params.IIITD=="ALL"){
//     RD.find({rank:req.params.rank,Year:req.params.Year})
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))
//   }
//   else if(req.params.rank=="ALL"&&req.params.Year!="ALL"&&req.params.IIITD!="ALL"){
//     RD.find({Year:req.params.Year,IIITD:req.params.IIITD})
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))  
//   }
//   else if(req.params.rank!="ALL"&&req.params.Year=="ALL"&&req.params.IIITD!="ALL"){
//     RD.find({rank:req.params.rank,IIITD:req.params.IIITD})
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))
//   }
//   else if(req.params.rank!="ALL"&&req.params.Year=="ALL"&&req.params.IIITD=="ALL"){
//     RD.find({rank:req.params.rank})
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))
//   }
//   else if(req.params.rank=="ALL"&&req.params.Year!="ALL"&&req.params.IIITD=="ALL"){
//     RD.find({Year:req.params.Year})
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))
//   }
//   else if(req.params.rank=="ALL"&&req.params.Year=="ALL"&&req.params.IIITD!="ALL"){
//     RD.find({IIITD:req.params.IIITD})
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))
//   }
//   else{
//     RD.find()
//     .then(rd=>res.json(rd.length))
//     .catch(err=> res.status(400).json('Error: ' + err))
//   }
// });

router.route('/rddata/:rank').get((req,res) =>{
    RD.find({rank:req.params.rank})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
});
router.route('/:id').get((req,res) =>{
    RD.findById(req.params.id)
    .then(rd => res.json(rd))
    .catch(err => res.status(400).json('Error: ' + err));
}
);
router.route('/rddata/:IIITD/:Year/:rank').get((req,res) =>{
    console.log(req)
    if(req.params.rank!="ALL" && req.params.Year!="ALL" && req.params.IIITD!="ALL"){
        RD.find({rank:req.params.rank,Year:req.params.Year,IIITD:req.params.IIITD})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
      }
      else if(req.params.rank!="ALL"&&req.params.Year!="ALL"&&req.params.IIITD=="ALL"){
        RD.find({rank:req.params.rank,Year:req.params.Year})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
      }
      else if(req.params.rank=="ALL"&&req.params.Year!="ALL"&&req.params.IIITD!="ALL"){
        RD.find({Year:req.params.Year,IIITD:req.params.IIITD})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))  
      }
      else if(req.params.rank!="ALL"&&req.params.Year=="ALL"&&req.params.IIITD!="ALL"){
        RD.find({rank:req.params.rank,IIITD:req.params.IIITD})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
      }
      else if(req.params.rank!="ALL"&&req.params.Year=="ALL"&&req.params.IIITD=="ALL"){
        RD.find({rank:req.params.rank})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
      }
      else if(req.params.rank=="ALL"&&req.params.Year!="ALL"&&req.params.IIITD=="ALL"){
        RD.find({Year:req.params.Year})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
      }
      else if(req.params.rank=="ALL"&&req.params.Year=="ALL"&&req.params.IIITD!="ALL"){
        RD.find({IIITD:req.params.IIITD})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
      }
      else{
        RD.find()
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
      }
    
});



router.route('/rddata/:rank/:Year').get((req,res) =>{
    RD.find({rank:req.params.rank,Year:req.params.Year})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
});
router.route('/rddata/:rank/:IIITD').get((req,res) =>{
    RD.find({rank:req.params.rank,IIITD:req.params.IIITD})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
});
router.route('/rddata/:Year/:IIITD').get((req,res) =>{
    RD.find({Year:req.params.Year,IIITD:req.params.IIITD})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
});
router.route('/rddata/:rank').get((req,res) =>{
    RD.find({rank:req.params.rank})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
});
router.route('/rddata/:Year').get((req,res) =>{
    RD.find({Year:req.params.Year})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
});
router.route('/rddata/:IIITD').get((req,res) =>{
    RD.find({IIITD:req.params.IIITD})
        .then(rd=>res.json(rd))
        .catch(err=> res.status(400).json('Error: ' + err))
});



var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
var uploads = multer({ storage: storage })
var empResponse
router.route('/upload').post(uploads.single('file'), (req, res) => {
  console.log(req)
  console.log(__dirname)
  csv()
    .fromFile(req.file.path)
    .then((response) => {
      for (var x = 0; x < response; x++) {
        empResponse = parseFloat(response[x].Authors)
        response[x].Authors = empResponse
        empResponse = parseFloat(response[x].AuthorID)
        response[x].AuthorID = empResponse
        empResponse = parseFloat(response[x].Title)
        response[x].Title = empResponse
        empResponse = parseFloat(response[x].Year)
        response[x].Year = empResponse
        empResponse = parseFloat(response[x].Sourcetitle)
        response[x].Sourcetitle = empResponse
        empResponse = parseFloat(response[x].Volume)
        response[x].Volume = empResponse
        empResponse = parseFloat(response[x].Issue)
        response[x].Issue = empResponse
        empResponse = parseFloat(response[x].ArtNo)
        response[x].ArtNo = empResponse
        empResponse = parseFloat(response[x].Page_start)
        response[x].Page_start = empResponse
        empResponse = parseFloat(response[x].Page_end)
        response[x].Page_end = empResponse
        empResponse = parseFloat(response[x].Cited_by)
        response[x].Cited_by = empResponse
        empResponse = parseFloat(response[x].DOI)
        response[x].DOI = empResponse
        empResponse = parseFloat(response[x].Affiliations)
        response[x].Affiliations = empResponse
        empResponse = parseFloat(response[x].Authors_with_affiliations)
        response[x].Authors_with_affiliations = empResponse
        empResponse = parseFloat(response[x].Abstract)
        response[x].Abstract = empResponse
        empResponse = parseFloat(response[x].References)
        response[x].References = empResponse
        empResponse = parseFloat(response[x].Publisher)
        response[x].Publisher = empResponse
        empResponse = parseFloat(response[x].Conference_name)
        response[x].Conference_name = empResponse
        empResponse = parseFloat(response[x].Conference_date)
        response[x].Conference_date = empResponse
        empResponse = parseFloat(response[x].Conference_location)
        response[x].Conference_location = empResponse
        empResponse = parseFloat(response[x].Conference_code)
        response[x].Conference_code = empResponse
        empResponse = parseFloat(response[x].EID)
        response[x].EID = empResponse
        empResponse = parseFloat(response[x].rank)
        response[x].rank = empResponse
        empResponse = parseFloat(response[x].IIITD)
        response[x].IIITD = empResponse
        empResponse = parseFloat(response[x].pub_url)
        response[x].pub_url = empResponse
        empResponse = parseFloat(response[x].doi_url)
        response[x].doi_url = empResponse
        
      }
      RD.insertMany(response, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/upload')
        }
      })
    })
})

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/../")
  },
  filename: (req, file, cb) => {
    cb(null, "scopus")
  },
})
var uploads = multer({ storage: storage })

router.route('/pub_data').post(uploads.single('file'), (req, res) => {
  csv()
    .fromFile(req.file.path)
})

router.route('/sync').post((req,res) => {
  const python = spawn('python', ['/Users/manavsaini/Desktop/rank_with_upload_with_multi/ranking_tracker/backend/auto.py']);
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend)
  });
});
module.exports = router;  