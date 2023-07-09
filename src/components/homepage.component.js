import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {CanvasJSChart} from 'canvasjs-react-charts'
export default class home extends Component{
    constructor(props){
        super(props);
        this.count = this.count.bind(this);
        this.state = {
          rank:'',
          Year:'',
          IIITD:'',
          rd:[],
          ranks:[],
          r_: new Set([]),
          years:[],
          y_: new Set([]),
          authors:[],
          a_:new Set([]),
          home_data:[],
          count:[],
          total:[]
        };
        
    }
    componentDidMount()  {
      axios.get('http://localhost:5500/rd/rddata')
        .then(response => {
          this.setState({ rd: response.data, ranks:response.data.map(r=>{this.state.r_.add(r.rank)
          }),ranks:Array.from(this.state.r_).sort(),years:response.data.map(r=>{this.state.y_.add(r.Year)
          }),years:Array.from(this.state.y_).sort(),authors:response.data.map(r=>{this.state.a_.add(r.IIITD)
          }),authors:Array.from(this.state.a_).sort(),rank:"ALL",Year:"ALL",IIITD:"ALL"},()=>{this.count()})
        })
        .catch((error) => {
          console.log(error);
        })
        

        // console.log(this.state.ranks)
        // let all=this.state.ranks
        // for(let i=0;i<this.state.years.length;i++){
        //     let sub=[]
        //     sub.push(this.state.years[i])
        //     for(let j=0;j<this.state.ranks.length;j++){
        //         axios.get('http://localhost:5500/rd/rddata/'+this.state.ranks[j]+"/"+this.state.Year[i]+"/ALL")
        //         .then(response => {
        //             this.setState({ rd: response.data })
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        //         sub.push(this.state.rd.length)
        //     }
        //     all.push(sub)
        // }
        // this.setState({home_data:all})
    }

    count(){
      let c=[]
      console.log(this.state.years)
      console.log(this.state.ranks)
      for(let i=0;i<this.state.years.length;i++){
        for(let j=0;j<this.state.ranks.length;j++){
          axios.get('http://localhost:5500/rd/rddata/'+'ALL/'+this.state.years[i]+"/"+this.state.ranks[j])
          .then(response => {
            c.push(response.data.length)
          })
          .catch((error) => {
            console.log(error);
          })
        }
      }
      this.setState({count:c})
      let t=[]
      for(let i=0;i<this.state.ranks.length;i++){
        axios.get('http://localhost:5500/rd/rddata/'+'ALL/ALL/'+this.state.ranks[i])
        .then(response => {
          t.push(response.data.length)
        })
      this.setState({total:t},()=>{console.log("INSIDE")})
    }
  }

    // count(r,y){
    //   axios.get('http://localhost:5500/rd/len/'+r+"/"+y+"/ALL")
    //     .then(response => {
    //       this.setState({ c: response.data})
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }

      render(){
        const options = {
          animationEnabled: true,
          theme: "dark2",
          title: {
            text: "Total Publications vs Year"
          },
          axisY: {
          title: "Total Publications",
            
          },
          data: [{
            type: "column",
            indexLabel: "{y}",		
            indexLabelFontColor: "white",
            dataPoints: [
              { x: 2009, y: 1 },
                  { x: 2010, y: 10 },
                  { x: 2011, y: 5 },
                  { x: 2012, y: 12 },
                  { x: 2013, y: 26 },
                  { x: 2014, y: 40 },
                  { x: 2015, y: 59 },
                  { x: 2016, y: 72 },
                  { x: 2017, y: 33 },
                  { x: 2018, y: 148 },
                  { x: 2019, y: 142 },
                  { x: 2020, y: 148 },
                  { x: 2021, y: 206 },
                  { x: 2022, y: 163}    
            ]
          }]
        }
            // const options = {
            //   animationEnabled: true,
            //   exportEnabled: true,
            //   theme: "light2", //"light1", "dark1", "dark2"
            //   title:{
            //     text: "Total Publications vs Year"
            //   },
            //   axisY: {
            //     includeZero: true
            //   },
            //   data: [{
            //     type: "column", //change type to bar, line, area, pie, etc
            //     //indexLabel: "{y}", //Shows y value on all Data Points
            //     indexLabelFontColor: "#5A5757",
            //     indexLabelPlacement: "outside",
            //     dataPoints: [
            //       { x: 2009, y: 1 },
            //       { x: 2010, y: 10 },
            //       { x: 2011, y: 5 },
            //       { x: 2012, y: 12 },
            //       { x: 2013, y: 26 },
            //       { x: 2014, y: 40 },
            //       { x: 2015, y: 59 },
            //       { x: 2016, y: 72 },
            //       { x: 2017, y: 33 },
            //       { x: 2018, y: 148 },
            //       { x: 2019, y: 142 },
            //       { x: 2020, y: 148 },
            //       { x: 2021, y: 206 },
            //       { x: 2022, y: 163}
            //     ]
            //   }]

              
            // } 

            const opt = {
              animationEnabled: true,
              exportEnabled: true,
              theme: "dark2", // "light1", "dark1", "dark2"
              title:{
                text: "Publications vs Rank"
              },
              data: [{
                type: "pie",
                indexLabel: "{label}: {y}",		
                startAngle: -90,
                dataPoints: [
                  { y: 53, label: "CORE A*" },
                  { y: 133, label: "CORE A" },
                  { y: 89, label: "CORE B" },
                  { y: 136, label: "JCR Q1" },
                  { y: 41, label: "JCR Q2" },
                  { y: 80, label: "JCR Q3" },
                  { y: 577, label: "JCR Q4" }		
                ]
              }]
            }
          return(
            <div>
              <div class="row">
                <div class="col-lg-6">
                <CanvasJSChart options = {opt} 
          /* onRef={ref => this.chart = ref} *//>

                </div>
                <div class="col-lg-6">
                <CanvasJSChart options = {options} />
                </div>
              </div>
              <div>
              
                </div>			
                {/* <div>
                    {this.compute()}
                </div>
            <table>
              <thead>
                <tr>
                  {this.state.home_data[0]?.map((item, index) => {
                    return <th>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {this.state.home_data.slice(1, this.state.home_data.length).map((item, index) => {
                  return (
                    <tr>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      <td>{item[6]}</td>
                      <td>{item[7]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
            <table class="table">
                <thead>
                  <tr>
                    {/* <th scope="col" class="font-weight-bold">Year</th>
                    {
                      this.state.ranks.map((item, index) => {
                        return <th scope="col" class="font-weight-bold">{item}</th>;
                      })
                    } */}
                    
                    <th scope="col" class="font-weight-bold">Year</th>

                    {/* {
                      this.state.ranks.map((item, index) => {
                        return <th scope="col" class="font-weight-bold">{item}</th>;
                      })

                    } */}
                    <th scope="col" class="font-weight-bold">Core A*</th>
                    <th scope="col" class="font-weight-bold">Core A</th>
                    <th scope="col" class="font-weight-bold">Core B</th>
                    <th scope="col" class="font-weight-bold">Q1</th>
                    <th scope="col" class="font-weight-bold">Q2</th>
                    <th scope="col" class="font-weight-bold">Q3</th>
                    <th scope="col" class="font-weight-bold">Q4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" class="font-weight-bold" >Total</th>
                    
                    {/* {this.count("As","2009")} */}
                    <td class="font-weight-bold">53</td>
                    {/* {this.count("A","2009")} */}
                    <td class="font-weight-bold">133</td>
                    {/* {this.count("B","2009")} */}
                    <td class="font-weight-bold">89</td>
                    {/* {this.count("Q1","2009")} */}
                    <td class="font-weight-bold">136</td>
                    {/* {this.count("Q2","2009")} */}
                    <td class="font-weight-bold">41</td>
                    {/* {this.count("Q3","2009")} */}
                    <td class="font-weight-bold">80</td>
                    {/* {this.count("Q4","2009")} */}
                    <td class="font-weight-bold">577</td>
                    {/* {
                      this.state.ranks.map((item, index) => {
                        this.count(item,"ALL")
                        return <td class="font-weight-bold">{this.state.c}</td>;
                      })
                    } */}
                    
                  </tr>
                  <tr>
                    <th scope="row">2009</th>
                    {/* {this.count("As","2009")} */}
                    <td>0</td>
                    {/* {this.count("A","2009")} */}
                    <td>0</td>
                    {/* {this.count("B","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>1</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>0</td>
                  </tr>
                  <tr>
                    <th scope="row">2010</th>
                    {/* {this.count("As","2009")} */}
                    <td>0</td>
                    {/* {this.count("A","2009")} */}
                    <td>2</td>
                    {/* {this.count("B","2009")} */}
                    <td>3</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>5</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>0</td>
                  </tr>
                  <tr>
                    <th scope="row">2011</th>
                    {/* {this.count("As","2009")} */}
                    <td>0</td>
                    {/* {this.count("A","2009")} */}
                    <td>0</td>
                    {/* {this.count("B","2009")} */}
                    <td>3</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>2</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>0</td>
                  </tr>
                  <tr>
                    <th scope="row">2012</th>
                    {/* {this.count("As","2009")} */}
                    <td>1</td>
                    {/* {this.count("A","2009")} */}
                    <td>3</td>
                    {/* {this.count("B","2009")} */}
                    <td>3</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>5</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>0</td>
                  </tr>
                  <tr>
                    <th scope="row">2013</th>
                    {/* {this.count("As","2009")} */}
                    <td>1</td>
                    {/* {this.count("A","2009")} */}
                    <td>6</td>
                    {/* {this.count("B","2009")} */}
                    <td>8</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>9</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>2</td>
                  </tr>
                  <tr>
                    <th scope="row">2014</th>
                    {/* {this.count("As","2009")} */}
                    <td>8</td>
                    {/* {this.count("A","2009")} */}
                    <td>8</td>
                    {/* {this.count("B","2009")} */}
                    <td>6</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>1</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>6</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>11</td>
                  </tr>
                  <tr>
                    <th scope="row">2015</th>
                    {/* {this.count("As","2009")} */}
                    <td>3</td>
                    {/* {this.count("A","2009")} */}
                    <td>9</td>
                    {/* {this.count("B","2009")} */}
                    <td>13</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>27</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>3</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>3</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>1</td>
                  </tr>
                  <tr>
                    <th scope="row">2016</th>
                    {/* {this.count("As","2009")} */}
                    <td>8</td>
                    {/* {this.count("A","2009")} */}
                    <td>16</td>
                    {/* {this.count("B","2009")} */}
                    <td>11</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>2</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>6</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>29</td>
                  </tr>
                  <tr>
                    <th scope="row">2017</th>
                    {/* {this.count("As","2009")} */}
                    <td>8</td>
                    {/* {this.count("A","2009")} */}
                    <td>9</td>
                    {/* {this.count("B","2009")} */}
                    <td>4</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>4</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>19</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>33</td>
                  </tr>
                  <tr>
                    <th scope="row">2018</th>
                    {/* {this.count("As","2009")} */}
                    <td>3</td>
                    {/* {this.count("A","2009")} */}
                    <td>30</td>
                    {/* {this.count("B","2009")} */}
                    <td>9</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>4</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>19</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>83</td>
                  </tr>
                  <tr>
                    <th scope="row">2019</th>
                    {/* {this.count("As","2009")} */}
                    <td>7</td>
                    {/* {this.count("A","2009")} */}
                    <td>16</td>
                    {/* {this.count("B","2009")} */}
                    <td>6</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>4</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>18</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>91</td>
                  </tr>
                  <tr>
                    <th scope="row">2020</th>
                    {/* {this.count("As","2009")} */}
                    <td>7</td>
                    {/* {this.count("A","2009")} */}
                    <td>13</td>
                    {/* {this.count("B","2009")} */}
                    <td>2</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>1</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>3</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>122</td>
                  </tr>
                  <tr>
                    <th scope="row">2021</th>
                    {/* {this.count("As","2009")} */}
                    <td>3</td>
                    {/* {this.count("A","2009")} */}
                    <td>13</td>
                    {/* {this.count("B","2009")} */}
                    <td>13</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>21</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>5</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>6</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>145</td>
                  </tr>
                  <tr>
                    <th scope="row">2022</th>
                    {/* {this.count("As","2009")} */}
                    <td>4</td>
                    {/* {this.count("A","2009")} */}
                    <td>8</td>
                    {/* {this.count("B","2009")} */}
                    <td>8</td>
                    {/* {this.count("Q1","2009")} */}
                    <td>66</td>
                    {/* {this.count("Q2","2009")} */}
                    <td>17</td>
                    {/* {this.count("Q3","2009")} */}
                    <td>0</td>
                    {/* {this.count("Q4","2009")} */}
                    <td>60</td>
                  </tr>
                  
                </tbody>
              </table>
          </div>
          );
      }
    }