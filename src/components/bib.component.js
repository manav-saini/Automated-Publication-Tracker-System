import React, { Component } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

 class bib_data extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Title: '',
        Authors: '',
        Sourcetitle:'',
        Conference_name: '',
        Publisher: '',
        Cited_by: '',
        Page_start:'',
        Page_end:'',
        Abstract: ''
      }
    }
    componentDidMount() {
        let { id } = this.props.params;
        axios.get('http://localhost:5500/rd/'+id)
        .then(response => {
            this.setState({ 
                Title:response.data.Title,
                Authors:response.data.Authors,
                Sourcetitle:response.data.Sourcetitle,
                Conference_name:response.data.Conference_name,
                Publisher:response.data.Publisher,
                Cited_by:response.data.Cited_by,
                Page_start:response.data.Page_start,
                Page_end:response.data.Page_end,
                Abstract:response.data.Abstract
             })
          })
          .catch((error) => {
            console.log(error);
          })
    }

      render(){
        return(
            <div>
                <div>
                <h2>{this.state.Title}</h2>
                </div>                
                 <div>
                 <h5>Author: {this.state.Authors}</h5>
                 </div>
                 <div>
                 <h5>Sourcetitle: {this.state.Sourcetitle}</h5>
                 </div>
                 <div>
                 <h5>Conference: {this.state.Conference_name}</h5>
                 </div>
                 <div>
                 <h5>Publisher: {this.state.Publisher}</h5>
                 </div>
                 <div>
                 <h5>No. of Citations: {this.state.Cited_by}</h5>
                 </div>
                 <div>
                 <h5>Page start: {this.state.Page_start}</h5>
                 </div>
                 <div>
                 <h5>Page end: {this.state.Page_end}</h5>
                 </div>
                 <div>
                 <h5>Abstract: {this.state.Abstract}</h5>
                 </div>
            </div>
        );
    }
}

export default withParams(bib_data);