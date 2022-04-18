const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const { render } = require('ejs');

//express app
const app = express();


//connect to mongoDB
// const db = 'mongodb+srv://<username>:<password>@blogsninja.5j9ox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const db = 'mongodb+srv://netninja:net1234@blogsninja.5j9ox.mongodb.net/BlogsNinja?retryWrites=true&w=majority'
mongoose.connect(db)
.then((result) => console.log('connected to DB'))
.catch((err) => console.log(err))

//register VIEW ENIGNE
app.set('view engine', 'ejs');

// app.set('views', 'myviews')                 //if ypu want your ejs folder somewhere else



//listen for request+8732
app.listen(3000);


//middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create a new Blog" });
})


//blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({createdAt: 1})
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
});
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', {blog: result, title: 'Blog Details'})
    })
    .catch((err) => {
        console.log(err);
    })
})

app.delete('/blogs/:id', (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/blogs' })
    })
    .catch((err) => {
        console.log(err);
    })
})


//404 - page not found
app.use((req,res) => {
    res.status(404).render('404', { title: "404" })
})
