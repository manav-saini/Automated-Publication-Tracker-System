import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ExportReactCSV } from './ExportReactCSV'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const RANK_DATA = props => (
    <tr>
      <td>{props.rankdata_.Title}</td>
      <td>{props.rankdata_.rank}</td>
      <td>{props.rankdata_.Year}</td>
      <td>{props.rankdata_.Authors}</td>
      <td>{props.rankdata_.IIITD}</td>
      <td>{props.rankdata_.Cited_by}</td>
      <td>
        <Link to={"/"+props.rankdata_._id}>BIB</Link> | <a href="" onClick={() =>{ window.open(props.rankdata_.doi_url, '_blank')}}>URL</a>
      </td>
    </tr>
  )

  export default class rankDataList extends Component{
      constructor(props){
          super(props);
          this.onChangeRank = this.onChangeRank.bind(this);
          this.onChangeAuthor = this.onChangeAuthor.bind(this);
          this.onChangeYear = this.onChangeYear.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
          this.oncheckAuthor = this.oncheckAuthor.bind(this);
          this.oncheckRank = this.oncheckRank.bind(this);
          this.oncheckYear = this.oncheckYear.bind(this);
          this.state = {
            rank:'',
            Year:'',
            IIITD:'',
            rd:[],
            ranks:[],
            r_: new Set(["ALL"]),
            years:[],
            y_: new Set(["ALL"]),
            authors:[],
            a_:new Set(["ALL"]),
            checked_year:[],
            checked_rank:[],
            checked_author:[]
          };
      }
      
      componentDidMount() {
        axios.get('http://localhost:5500/rd/rddata')
          .then(response => {
            this.setState({ rd: response.data, ranks:response.data.map(r=>{this.state.r_.add(r.rank)
            }),ranks:Array.from(this.state.r_).sort(),years:response.data.map(r=>{this.state.y_.add(r.Year)
            }),years:Array.from(this.state.y_).sort(),authors:response.data.map(r=>{this.state.a_.add(r.IIITD)
            }),authors:Array.from(this.state.a_).sort(),rank:"ALL",Year:"ALL",IIITD:"ALL"})
          })
          .catch((error) => {
            console.log(error);
          })
        }
      rankList() {
        return this.state.rd.map(currentdata => {
          return <RANK_DATA rankdata_={currentdata} onSubmit={this.onSubmit} key={currentdata._id}/>;
        })
      }


      rank_list(r){
        axios.get('http://localhost:5500/rd/rddata/'+r)
          .then(response => {
            this.setState({ rd: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
      onChangeRank(e){
        this.setState({rank:e.target.value})
      }
      onChangeAuthor(e){
        this.setState({IIITD:e.target.value})
      }
      onChangeYear(e){
        this.setState({Year:e.target.value})
      }
      oncheckYear(e,r){
        if(e.target.checked){
          let a = this.state.checked_year
          a.push(r)
          this.setState({checked_year:a})
        }
        else{
          let a = this.state.checked_year
          const index = a.indexOf(r);
            if (index > -1) { 
              a.splice(index, 1); 
            }
          this.setState({checked_year:a})
        }
      }
      oncheckRank(e,r){ 
        if(e.target.checked){
          let a = this.state.checked_rank
          a.push(r)
          this.setState({checked_rank:a})
        }
        else{
          let a = this.state.checked_rank
          const index = a.indexOf(r);
            if (index > -1) { 
              a.splice(index, 1); 
            }
          this.setState({checked_rank:a})
        }
        
      }
      oncheckAuthor(e,r){
        if(e.target.checked){
          let a = this.state.checked_author
          a.push(r)
          this.setState({checked_author:a})
        }
        else{ 
          let a = this.state.checked_author
          const index = a.indexOf(r);
            if (index > -1) { 
              a.splice(index, 1); 
            }
          this.setState({checked_author:a})
        }
      } 
      // onSubmit(e){
      //   e.preventDefault();
      //   axios.get('http://localhost:5500/rd/rddata/'+this.state.rank+"/"+this.state.Year+"/"+this.state.IIITD)
      //     .then(response => {
      //       this.setState({ rd: response.data })
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
        
      // }

      onSubmit(e){
        e.preventDefault();
        let q =[]
        let count =0
        console.log(this.state.checked_author)
        console.log(this.state.checked_year)
        console.log(this.state.checked_rank)
        for(let i=0;i<this.state.checked_author.length;i++){
          for(let j=0;j<this.state.checked_year.length;j++){
            for(let k=0;k<this.state.checked_rank.length;k++){
              axios.get('http://localhost:5500/rd/rddata/'+this.state.checked_author[i]+"/"+this.state.checked_year[j]+"/"+this.state.checked_rank[k])
              .then(response => {
                if(count==0){
                  this.setState({rd:[].concat(response.data)})
                  count=1
                }
                else{
                  this.setState({rd:this.state.rd.concat(response.data)})
                }
              })
              .catch((error) => {
                console.log(error);
              })
            }
          }
        // axios.get('http://localhost:5500/rd/rddata/filtered', {params:{
        //   r:this.state.checked_rank,
        //   y:this.state.checked_year,
        //   a:this.state.checked_author
        // }})
        //   .then(response => {
        //     this.setState({ rd: response.data })
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
        
      }
    }


      // gotourl(url){
      //   window.location.replace(url);
      //   return null;
      // }

//     jcrdataList() {
//         return this.state.data.map(currentdata => {
//           return <jcr_data data={currentdata}/>;
//         })
//     }

//     onsubmit(e){
//         e.preventDefault();
//         axios.get('http://localhost:5500/RANK_DATA/jcrdata/:pub_year')
//         .then(response => {
//             this.setState({ jcrdata: response.data })
//           })
//           .catch((error) => {
//             console.log(error);
//           })
//         }
    
//      onChangeRank(e){
//         this.setState({
//             rank: this.state.rank
//         })
//     }
    render(){
        const num = this.state.rd.length;
        return(
            <div>
                  <form onSubmit={this.onSubmit}>
                    {/* <div className="form-group"> 
                      <label>Rank: </label>
                      <select ref="userInput"
                          required
                          className="form-control"
                          value={this.state.rank}
                          onChange={this.onChangeRank}>
                          {
                            this.state.ranks.map(function(r) {
                              return <option 
                                key={r}
                                value={r}>{r}
                                </option>;
                            })
                          }
                      </select>
                    </div> */}
                    <div className="btn-group">
                      <DropdownButton id={`dropdown-variants-Secondary`}  variant={'secondary'} title="Rank">
                        {this.state.ranks.map((r) => (
                        <Form.Check 
                              type='checkbox'
                              id={`default-checkbox`}
                              label={r}
                              onClick={event=>this.oncheckRank(event,r)}
                            />
                        ))
                        }
                      </DropdownButton>
                    {/* </div> */}
                    {/* <div className="form-group">
                      <label>Author: </label>
                      <select ref="userInput"
                          required
                          className="form-control"
                          value={this.state.IIITD}
                          onChange={this.onChangeAuthor}>
                          {
                            this.state.authors.map(function(r) {
                              return <option 
                                key={r}
                                value={r}>{r}
                                </option>;
                            })
                          }
                      </select>
                    </div> */}
                    <div className="form-group">
                      <DropdownButton id={`dropdown-variants-Secondary`}  variant={'secondary'} title="Author">
                        {this.state.authors.map((r) => (
                        <Form.Check 
                              type='checkbox'
                              id={`default-checkbox`}
                              label={r}
                              onClick={event=>this.oncheckAuthor(event,r)}
                            />
                        ))
                        }
                      </DropdownButton>
                    </div>
                    {/* <div className="form-group">
                      <label>Year: </label>
                      <select ref="userInput"
                          required
                          className="form-control"
                          value={this.state.Year}
                          onChange={this.onChangeYear}>
                          {
                            this.state.years.map(function(r) {
                              return <option 
                                key={r}
                                value={r}>{r}
                                </option>;
                            })
                          }
                      </select>
                    </div> */}
                    <div className="form-group">
                      <DropdownButton id={`dropdown-variants-Secondary`}  variant={'secondary'} title="Year">
                        {this.state.years.map((r) => (
                        <Form.Check 
                              type='checkbox'
                              id={`default-checkbox`}
                              label={r}
                              onClick={event=>this.oncheckYear(event,r)}
                            />
                        ))
                        }
                      </DropdownButton>
                    </div>
                    </div>
                    <div className="form-group">
                      <input type="submit" value="Submit" className="btn btn-primary" />
                      <ExportReactCSV csvData={this.state.rd} fileName='Rank_data'/>
                    </div>
                  </form>
                  <h5>Total: {num}</h5>
                  <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Title</th>
                      <th>Rank</th>
                      <th>Year</th>
                      <th>Co-Author</th>
                      <th>Author</th>
                      <th>No. of Citations</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.rankList() }
                  </tbody>
                </table>
            </div>
        );
    }
}