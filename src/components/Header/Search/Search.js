import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
constructor(){
  super()
  this.state ={
    text: ``
  }
}

updateText(val){
  this.setState({
    text: val
  })
  console.log(this.state.text)
}

filterFeed(){
  this.props.filterFeedFn(this.state.text)
}

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange = {ev => this.updateText(ev.target.value)} />

          <SearchIcon id="Search__icon" onClick={() => this.filterFeed()}/>
        </div>
        
      </section>
    )
  }
}