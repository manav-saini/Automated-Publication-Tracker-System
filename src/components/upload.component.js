import React, { Component} from 'react';
import axios from 'axios';

export default class upload extends Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.onpubFormSubmit = this.onFormSubmit.bind(this)
    this.pubfileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){
    if(file!=null){
      console.log(file)
      const url = 'http://localhost:5500/rd/upload';
      const formData = new FormData();
      formData.append('file',file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      return  axios.post(url, formData,config)
    } 
  }

  onpubFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.pubfileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }

  pubfileUpload(file){
    if(file!=null){
      console.log(file)
      const url = 'http://localhost:5500/rd/pub_data';
      const formData = new FormData();
      formData.append('file',file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      return  axios.post(url, formData,config)
    } 
  }

  sync(){
    
  }
  // constructor(){
  //   super()
  //   this.state = {
  //     file: null
  //   }
  //   this.handle = this.handle.bind(this);
  //   this.file_upload = this.file_upload.bind(this);
  // }
  // handle(e){
  //   this.setState({file:e.target.files[0]})
  // }
  //   file_upload(file){
  //         let formData = new FormData();
  //         formData.append('file',file);
  //         axios.post('http://localhost:5500/rd/upload', formData, {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //         }
  //       });
        
  //   }
    render() {
      return (
        <div>
        <form onSubmit={this.onpubFormSubmit}>
            <h3>Publication Data</h3>
          <input type="file" name="csvF" onChange={this.onChange} />
        <button type="submit" class="btn btn-success">Upload</button>
        </form>
        <form onSubmit={this.onpubFormSubmit}>
        <h3>Ranking Data</h3>
          <input type="file" name="csvF" onChange={this.onChange} />
        <button type="submit" class="btn btn-success">Upload</button>
        </form>
        <button type="button" class="btn btn-primary" onClick={this.sync()}>Sync Data</button>
        {/* <form onSubmit={this.onFormSubmit}>
          <h3>New Ranking System</h3>
        <input type="file" name="csvF" onChange={this.onChange} />
      <button type="submit" class="btn btn-success">Upload</button>
        </form> */}
        </div>
       );
       
    }
  }
  