import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      filterText: ``
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.updateText = this.updateText.bind(this)
    // this.filterFeed = this.filterFeed.bind(this)
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
         .then(res => {this.setState({posts: res.data})
                      console.log(res.data)})
         .catch(err => console.log(err))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text })
         .then(res => {this.setState({posts: res.data})
                console.log(res.data)})
         .catch(err => console.log(err))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
         .then(res => {this.setState({posts: res.data})
                console.log(res.data)})
         .catch(err => console.log(err))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
         .then(res => {this.setState({posts: res.data})})
         .catch(err => console.log(err))

  }

  updateText (val){
    this.setState({
      filterText: val
    })
  }

  // filterFeed(val) {
  //   this.setState({
  //     posts: this.state.posts.filter(elem => this.state.posts[elem].text.includes(val))
  //   })
  // }

  render() {
    const { posts } = this.state;
    
    return (
      <div className="App__parent">
        <Header filterFeedFn = {this.updateText}/>

        <section className="App__content">

          <Compose createPostFn = {this.createPost} />
          {/* {posts.map( post => ( */}
          {posts.filter(elem => elem.text.toLowerCase().includes(this.state.filterText.toLowerCase())).map( post => (
            <Post key={ post.id }
            text= { post.text }
            date= { post.date }
            id=   {post.id}
            updatePostFn = {this.updatePost}
            deletePostFn = {this.deletePost}/>            
            ))
          }
          
        </section>
          </div>
    );
  }
}

export default App;
