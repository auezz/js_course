const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const fnc = require('./ClassFunction');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    password: 'password',
    host: 'localhost',
    database: 'cad_anniversary'
});

//connect
db.connect((err) => {
    if (err) {
        //console.log('connection error');
        throw err;
    }
    console.log("mysql connected");
});


app.get('/wishList', (req, res) => {
    db.query("SELECT id_word,word FROM anniversary_word WHERE cad_round = '2' AND lang = 'TH' ", (err, result) => {
        if (err) {
            console.error('error');
        } else {
            res.send(result);
        }
    })
});

app.get('/govList', (req, res) => {
    db.query(`  SELECT  gov_main_id, 
                        gov_main
                FROM    gov_main
                ORDER BY order_list ASC`,
        (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(result);
            }
        })
});

app.post('/department', (req, res) => {
    const govId = req.body.govId;
    console.log('getId:',req.body);
    const sqlData = `  SELECT   gov_id, 
                                gov_name
                        FROM    gov_list
                        WHERE gov_main_id = '${govId}' `;
    console.log('sqlData: ',sqlData);                    
    db.query(sqlData,
        (err, result) => {
            if (err) {
                //throw err;
                console.err(err);
            } else {
                res.send(result);
            }
        })
});

app.get('/prefixName', (req, res)=>{
    const sqlPrefix = ` SELECT  id,
                                prefix_name_short
                        FROM    prefix_name       
                        ORDER BY id`;
    db.query(sqlPrefix, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })                    
});

app.get('/card-pic', (req, res)=>{
    const sql = `SELECT
                    card_id,
                    card_pic 
                FROM
                    card 
                WHERE
                    year = '2565' 
                    AND sort_id BETWEEN 1 
                    AND 10 
                ORDER BY
                    sort_id `;
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })                

});


app.post('/submit-data', (req, res)=>{
    const reqData = req.body;
    console.log('reqData: ', reqData);
    let insertData = {  category: reqData.govItem,
                        organize: reqData.departItem,
                        prefix_name: reqData.prefix,
                        nameposition: reqData.position,
                        texttab: reqData.wishText,
                        fname: reqData.firstName,
                        lname: reqData.lastName,
                        card_id: reqData.cardData.card_id
                    };
    console.log('insertData', insertData); 
    let sql = `INSERT INTO anniversary_main (category, organize, prefix_id, first_name, last_name, position_name, wish_text, card_id, year)
               VALUES (${insertData.category}, ${insertData.organize}, ${insertData.prefix_name}, '${insertData.fname}', '${insertData.lname}', '${insertData.nameposition}', '${insertData.texttab}', ${insertData.card_id}, 2565)`;
    //let sql = fnc.db_insert("anniversary_main", insertData);
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }else{
            //res.send(result);
            res.sendStatus(200);
        }
    });                     
});

app.get('/visit-list', (req, res)=>{
    const sql = "SELECT * FROM anniversary_main ORDER BY id DESC";
    db.query(sql, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })      

});



app.listen('5000', () => {
    console.log('server: port 5000 is running');
});
