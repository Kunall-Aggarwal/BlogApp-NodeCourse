const express = require('express')
const morgan = require('morgan')

//express app
const app = express();

//register VIEW ENIGNE
app.set('view engine', 'ejs');

// app.set('views', 'myviews')                 //if ypu want your ejs folder somewhere else



//listen for request+8732
app.listen(3000);

// app.use((req,res,next) => {
//     console.log('new request made:')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next();
// })

// app.use((req,res,next) => {
//     console.log('In the next middleware\n')
//     next();
// })

//middleware and static files

app.use(express.static('public'))
app.use(morgan('dev'));


app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds egg', snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, neque!'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, neque!'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, neque!'}
    ];
    res.render('index', { title: "Home", blogs })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create a new Blog" });
})

//404 - page not found
app.use((req,res) => {
    res.status(404).render('404', { title: "404" })
})
