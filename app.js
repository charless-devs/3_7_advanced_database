const express = require ('express');
const conn = require('./conn.js');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//to set templating engine
app.set('view engine', 'ejs');

//returning index page
app.get('/', (req, res)=>{
    res.render('index');
})

//inserting data to database
app.post('/register', (req, res)=>{
    const ln = req.body.ln;
    const fn = req.body.fn;
    const age = req.body.age;
    const add = req.body.add;

    const insert = `INSERT INTO tbl_students VALUES('0','${ln}','${fn}','${age}','${add}')`;

    //to execute the query
    conn.query(insert, ['', fn, ln, age, add], (err) => {
        if (err) throw err;
        res.send(`
            <script>
                alert('Data Inserted');
                location.href='/'
            </script>`);
    })
});


//route for displaying data
app.get('/view', (req, res)=>{
    const getData = `SELECT * FROM tbl_students`;


    //to execute the query
    conn.query(getData, (err, data)=>{
        if(err) throw err;
        res.render('view', {
            student: data
        })
    });
});//closing of display data

app.get('/delete/:id', (req, res)=>{

    const del_id = req.params.id;
    const toDelete = `DELETE FROM tbl_students WHERE idnum = '${del_id}'`;

    conn.query(toDelete, (err)=>{
        if(err) throw err;
        res.send(`<script> 
                alert('Data Deleted!') 
                location.href='/view'  
                </script>`)
    })
})

app.listen(8000, () => {
    console.log("http://localhost:8000")
}) 