const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

promise = global.promise

function teardownDB(){
log in to server
return new Promise(reject,resolve){
  console.log('deleting the database')
  mongoose.connect.dropDatabase()
  .then(result => resolve(result))
  .catch(error => reject(error));
});

}


//Seeding my data

function seedingData(){
  console.log('seeding my data')
  const seedData = [];
  for(let i =0; i< seedData.length; i++){
  seedData.push({
    title:res.body.title,
    author:{
      firstname:res.body.firstname,
      lastname:res.body.lastname
    },
    content:res.body.sentence
  })
}
  return blogPost.insertMany(seedData);
}


//test my endpoints


describe('we are testing my db',function(){

before(function(){
  return startServer();
})

beforeEach(function(){
  return seedingData();
})

afterEach(function()){
  return teardownDB();
}

after(function(){
  return closeServer();
})

  it('should test my get',function(){
    let res;
    return chai.request(app);
    .get('/posts')
    .then(_res=>{
      res = _res;
      const message = `status is good!`;
      res.status(200).send(message);
    })

  })


  it('should return posts in right field', function(){
    let resPosts;
    return chai.request(app);
    .get('/post')
    .then(_resPosts =>{
      resPosts = _resPosts;
      resPosts.shoud.have.status(200);
      resPosts.should.be.JSON;
      resPosts.forEach(function(post){
        post.should.be.a('object');
        post.should.include.keys('title','author','content','created');
      })
        .then(posts =>{
          resPosts.title.should.equal(posts.title);
          resPosts.content.should.equal(posts.author);
          resPosts.author.should.equal(posts.content);
        })
        return blogPost
    })
  })
})


it('post endpoints', function(){
  const newPost = {
    title:'test',
    author:{
      firstname:'kevin',
      lastname:'schmitz'
    },
    content:'some content'
  }
  return chai.request(app)
  .post('/posts')
  .send(newPost)
  .then(function(res){
    res.should.have.status(200);
    res.should.be.JSON;
    res.should.be.a('object');
    res.body.should.include.keys('title','author','content');
    return BlogPost.findById(res.body.id);
  })
  .then(function(post){
    newPost.title.should.equal(post.body.title);
    newPost.author.should.equal(post.body.author);
    newPost.content.should.equal(post.body.content);
  })
})

it('should check all my put endpoints', function(){
  const updatedPost ={
    title:'new',
    authorname:{
      firstname:'kevin',
      lastname:'schmitz'
    },
    content:'new content'
  }
    return Blogpost
    .findOne();
    .then(post =>{
      updated.id = post.id

  return chai.request(app)
  .put(`/post/${post.id}`)
  .send(updatedPost)
  })
  .then(function(res){
    res.should.have.status(204);
    return blogPost.findById(updated.id)
  .then(post =>{
    updatedPost.title.should.equal(post.body.title);
    updatedPost.author.should.equal(post.body.author);
    updatedPost.content.should.equal(post.body.content);
  })

  })

})

describe('delete endpoints',function(){
  it('should test me delete endpoint',function(){
    let post;
    return BlogPost
      .findOne()
      .then(_post=>{
        post =_post
        return chai.request(app).delete(`/post/${post.id}`)
      })
      .then(res =>{
         res.should.have.status(204);
         return Blogpost.findById(post.id);
      })
  })
})
