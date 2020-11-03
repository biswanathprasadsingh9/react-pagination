import React, { Component } from 'react'
import './App.css';
import Pagination from "react-js-pagination";
import axios from 'axios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      people:[],
      peopleo:[]
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    axios.get(`https://www.learningall.me/api/people?page=${pageNumber}`)
      .then(res => {
        const persons = res.data;
        this.setState({ 
          people:persons.data,
          activePage: pageNumber});
      })

  }

  // handleSearch(e){
  //     axios.get(`https://www.learningall.me/api/people/getname/${e.target.value}`)
  //     .then(res => {
  //       const persons = res.data;
  //       this.setState({ people:persons.data,
  //         peopleo:persons, });
  //     })
  // }


  
  componentDidMount() {
    axios.get(`https://www.learningall.me/api/people`)
      .then(res => {
        const persons = res.data;
        this.setState({ people:persons.data,
          peopleo:persons, });
      })
  }

  handleSearch(){
    axios.get(`https://www.learningall.me/api/people`)
      .then(res => {
        const persons = res.data;
        this.setState({ people:persons.data,
          peopleo:persons, });
      })
  }

  render() {

    return (
      <div className="container col-md-4 mt-5 mb-5">
        <h2><input type="text" className="form-control" placeholder="Search Names" onChange={this.handleSearch} /></h2>
        <br/>
        <ul>
        { this.state.people.map(person => <li>{person.id} {person.name}</li>)}
        </ul>
        <br/>
        <Pagination
        itemClass="page-item"
        linkClass="page-link"
        hideDisabled
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.peopleo.per_page}
          totalItemsCount={this.state.peopleo.total}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    )
  }
}
