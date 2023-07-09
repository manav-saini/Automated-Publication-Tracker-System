const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RANKSchema = new Schema({
  Authors:{type: String},
  AuthorID:{type: String},
  Title:{type:String},
  Year:{type:Number},
  Sourcetitle:{type:String},
  Volume:{type:String},
  Issue:{type:String},
  ArtNo:{type: String},
  Page_start:{type:String},
  Page_end:{type:String},
  Cited_by:{type:String},
  DOI:{type:String},
  Link:{type:String},
  Affiliations:{type:String},
  Authors_with_affiliations:{type:String},
  Abstract:{type:String},
  References:{type:String},
  Publisher:{type:String},
  Conference_name:{type:String},
  Conference_date:{type:String},
  Conference_location:{type:String},
  Conference_code:{type:String},
  EID:{type:String},
  rank:{type:String},
  IIITD:{type:String},
  pub_url:{type:String},
  doi_url:{type:String}
});

const RANK = mongoose.model('RANK', RANKSchema);

module.exports = RANK;
