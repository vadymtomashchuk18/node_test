# node_test
REST API for the following model:
{
    title: 'text',
    id: 'unique, autoincrement',
    author: 'text',
    content: 'long text field',
},
================================
Database: MongoDB, located on mLab
================================
Scripts:
npm start - start project
npm run lint - run eslint for all .js files in project
npm run seed - seeds the database from files ./seeds/counters.js and ./seeds/posts.js
================================
Testing API with Postman; examples of queries:
GET, localhost:4000/posts => get all
GET, localhost:4000/posts/5b868fa4f8e03e1bd4a9a096 => get one via mongo mLab _id (5b868fa4f8e03e1bd4a9a096 is _id)
POST, localhost:4000/posts => insert post, needed data: { title: 'text', author: 'text', content: 'long text field',}. mLab _id and autoincrement id is attached automatically
PUT, localhost:4000/posts/5b868fa4f8e03e1bd4a9a096 => update post, needed data: { title: 'text', author: 'text', content: 'long text field',}
DELETE, localhost:4000/posts/5b868fa4f8e03e1bd4a9a096 => delete post
================================
