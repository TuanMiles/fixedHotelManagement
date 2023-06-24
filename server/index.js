const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const mysql = require("mysql")
const path = require('path');
const { dblClick } = require("@testing-library/user-event/dist/click");

app.use(cors());
app.use(express.json());

var DBconnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_management",
})

DBconnection.on('connection', (connection) => {
    connection.on('error', (err) => {
        console.lop(err)
    })
    connection.on('close', (err) => {
        console.log(err)
    })
})

// app.use(express.static(path.join(__dirname,'../client/build')))

// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })


app.use(cors({
    origin: "http://localhost:3000",
    methods: ['PUT', 'GET', 'POST']
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(5000, () => {
    console.log("server is running on port 5000")
    return "test"
})

app.post('/register', (req, res) => {
    let Gmail = req.body.Gmail
    let Password = req.body.Password
    let Firstname = req.body.Firstname
    let Lastname = req.body.Lastname
    let value = [Firstname, Lastname, Gmail, Password]
    DBconnection.query('select Gmail from  users where Gmail = ?', [Gmail], (e, result) => {
        if (result.length > 0) {
            res.send({ result })
        }
        else {
            DBconnection.query('insert into users (Firstname, Lastname, Gmail, Password) values (?)', [value], (e, result) => {
                if (e) console.log(e.message)
                else {
                    res.send('Create successfully')
                }
            })
        }
    })
})

app.post('/login', (req, res) => {
    let Gmail = req.body.Gmail
    let Password = req.body.Password
    DBconnection.query('select * from users where Gmail=? AND Password=?', [Gmail, Password], (e, result) => {
        console.log(result)
        if (e) console.log(e.message)
        if (result != null) res.send(result)
        else {
            res.sendStatus(404)
        }
    })
})

app.post('/createcustomer', (req, res) => {
    console.log(req.body)
    const userid = req.body.userid;
    const name = req.body.name;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const phone = req.body.phone;
    const identity = req.body.identity;
    const country = req.body.country;
    const address = req.body.address;
    const type = req.body.type;

    DBconnection.query('INSERT INTO customers (USERID, FULL_NAME, TYPE, GENDER, BIRTHDAY, PHONE_NUMBER, IDENTITY_NUMBER, COUNTRY, ADDRESS) VALUES (?,?,?,?,?,?,?,?,?)',
        [userid, name, type, gender, birthday, phone, identity, country, address], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('value inserted')
            }
        }
    );
})

app.get('/customers', (req, res) => {
    const userId = req.query.userId;
    DBconnection.query("SELECT * FROM customers WHERE USERID = ?",
    [userId],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }
    })
})

app.get('/exactcustomer', (req, res) => {
    const userId = req.query.userId;
    const paycusid = req.query.paycusid
    DBconnection.query("SELECT * FROM customers WHERE USERID = ? AND ID = ?",
    [userId, paycusid],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }
    })
})

app.put('/updatecustomers', (req, res) => {
    const name = req.body.name
    const room = req.body.room
    const id = req.body.id
    const gender = req.body.gender
    const birthday = req.body.birthday
    const phone = req.body.phone
    const identity = req.body.identity
    const country = req.body.country
    const address = req.body.address

    DBconnection.query("UPDATE customers SET FULL_NAME = ?, ROOM = ?, GENDER = ?, BIRTHDAY = ?, PHONE_NUMBER = ?, IDENTITY_NUMBER = ?, COUNTRY = ?, ADDRESS = ? WHERE ID = ?", 
    [name, room, gender,birthday,phone,identity,country,address,id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.put('/updaterentalstatus', (req, res) => {
    const status = "Paid"
    const recid = req.body.recid

    DBconnection.query("UPDATE rental_receipt SET STATUS = ? WHERE RECID = ?", 
    [status, recid ], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/deletecustomer/:id', (req,res) => {
    const id=req.params.id
    DBconnection.query("DELETE FROM customers WHERE ID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})


//Room

app.post('/createroom', (req, res) => {
    console.log(req.body)
    const userid = req.body.userid;
    const roomno = req.body.roomno;
    const type = req.body.type;
    const price = req.body.price;
    const status = req.body.status;
    const description = req.body.description;

    DBconnection.query('INSERT INTO rooms (USERID, ROOM_NO, TYPE, PRICE, STATUS, DESCRIPTION) VALUES (?,?,?,?,?,?)',
        [userid, roomno, type, price, status, description], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
})

app.get('/rooms', (req, res) => {
    const userId = req.query.userId; // Assuming you pass the userId as a query parameter
  
    DBconnection.query(
      'SELECT * FROM rooms WHERE USERID = ?',
      [userId],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error retrieving data');
        } else {
          res.send(result);
        }
      }
    );
  });

app.put('/updateroom', (req, res) => {
    const roomno = req.body.roomno
    const type = req.body.type
    const price = req.body.price
    const status = req.body.status
    const description = req.body.description
    const id = req.body.id

    DBconnection.query("UPDATE rooms SET ROOM_NO = ?, TYPE = ?, PRICE = ?, STATUS = ?, DESCRIPTION = ? WHERE ID = ?", 
    [roomno, type, price, status, description, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/deleteroom/:id', (req,res) => {
    const id=req.params.id
    DBconnection.query("DELETE FROM rooms WHERE ID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})

//RoomsType

app.post('/createroomstype', (req, res) => {
    console.log(req.body)
    const userid = req.body.userid;
    const type = req.body.type;
    const level = req.body.level;
    const price = req.body.price;
    const capacity = req.body.capacity;
    const rate = req.body.rate;
    const frompeople = req.body.frompeople;
    const description = req.body.desc;

    DBconnection.query('INSERT INTO rooms_type (USERID, FROMPEOPLE, TYPE, LEVEL, PRICE, CAPACITY, SC_RATE, DESCRIPTION) VALUES (?,?,?,?,?,?,?,?)',
        [userid,frompeople, type, level, price, capacity, rate, description], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
})



app.get('/roomstype', (req, res) => {
    const userId = req.query.userId;
    DBconnection.query("SELECT * FROM rooms_type WHERE USERID = ?",
    [userId],
    (err, result) => {
        if (err) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Handle the constraint error by sending an appropriate error response
                res.status(400).json({ error: 'Duplicate entry' });
              } else {
                // Handle other errors
                res.status(500).json({ error: 'Internal server error' });
              }
            console.log(err)
            res.status(400).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})

app.get('/roomstypewhat', (req, res) => {
    const userId = req.query.userId;
    const type = req.query.type
    DBconnection.query("SELECT * FROM rooms_type WHERE USERID = ? AND TYPE = ?",
    [userId, type],
    (err, result) => {
        if (err) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Handle the constraint error by sending an appropriate error response
                res.status(400).json({ error: 'Duplicate entry' });
              } else {
                // Handle other errors
                res.status(500).json({ error: 'Internal server error' });
              }
            console.log(err)
            res.status(400).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})

app.put('/updateroomstype', (req, res) => {
    const type = req.body.type;
    const level = req.body.level;
    const price = req.body.price;
    const capacity = req.body.capacity;
    const rate = req.body.rate
    const description = req.body.desc;
    const id = req.body.id;
    const frompeople = req.body.frompeople;

    DBconnection.query("UPDATE rooms_type SET TYPE = ?, LEVEL = ?, PRICE = ?, CAPACITY = ?, SC_RATE = ?, DESCRIPTION = ?, FROMPEOPLE = ? WHERE ID = ?", 
    [type, level, price, capacity, rate, description, frompeople, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.delete('/deleteroomstype/:id', (req,res) => {
    const id=req.params.id;
    DBconnection.query("DELETE FROM rooms_type WHERE ID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})


//reservations

app.post('/createreservation', (req, res) => {
    console.log(req.body)
    const userid = req.body.userid;
    const roomid = req.body.roomid;
    const room = req.body.room;
    const roomtype = req.body.roomtype;
    const arrival = req.body.arrival;
    const departure = req.body.departure;
    const month = req.body.month;
    const year = req.body.year;
    const regisdate = req.body.regisdate;
    const price = req.body.price;
    const status = "Pending";
    const dayprice = req.body.dayprice;
    const pnumb = req.body.pnumb
    
    DBconnection.query('INSERT INTO reservations (USERID, ROOMID, ROOM, ROOM_TYPE, PEOPLE_NUMB, REGISDATE, ARRIVAL, DEPARTURE, MONTH, YEAR, PRICE, DAYPRICE, STATUS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [userid, roomid, room, roomtype, pnumb, regisdate, arrival, departure, month, year, price, dayprice, status], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                 // Retrieve the generated Reservation ID
                res.send(result); // Include the Reservation ID in the response
            }
        }
    );
})

app.put('/updatereservation', (req, res) => {
    const userid = req.body.userid;
    const id = req.body.id;
    const roomid = req.body.roomid;
    const room = req.body.room
    const roomtype = req.body.roomtype;
    const regisdate = req.body.regisdate;
    const arrival = req.body.arrival;
    const departure = req.body.departure;
    const price = req.body.price;
    const paycusid = req.body.paycusid;
    const month = req.body.month;
    const year = req.body.year;

    DBconnection.query("UPDATE reservations SET USERID = ?, ROOMID = ?, ROOM = ?, ROOM_TYPE = ?, PAYCUSID = ?, REGISDATE = ?, ARRIVAL = ?, DEPARTURE = ?, MONTH = ?, YEAR = ?, PRICE = ? WHERE ID = ?", 
    [userid, roomid, room, roomtype, paycusid, regisdate, arrival, departure, month, year,  price, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


app.put('/updatepaycus', (req, res) => {
    const paycusid = req.body.paycusid;
    const id = req.body.id;
    const confirmed = true;
    DBconnection.query("UPDATE reservations SET PAYCUSID = ?, CONFIRMED = ? WHERE ID = ?", 
    [paycusid, confirmed, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})




app.delete('/deletereservationdetail/:id', (req,res) => {
    const id=req.params.id
    DBconnection.query("DELETE FROM reservation_detail WHERE RID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})

app.delete('/deletereservation/:id', (req,res) => {
    const id=req.params.id
    DBconnection.query("DELETE FROM reservations WHERE ID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})





app.put('/updatereservationdetail', (req, res) => {
    const userid = req.body.userid;
    const reserid = req.body.reserID;
    const customerid = req.body.customerID;
    const fullname = req.body.fullname;
    const custype = req.body.custype;
    const identity = req.body.identity;
    const birthday = req.body.birthday;

    DBconnection.query("UPDATE reservation_detail SET USERID = ?, CID = ?, FULL_NAME = ?, TYPE = ?, IDENTITY = ?, BIRTHDAY = ? WHERE RID = ?",  
    [userid, customerid, fullname, custype, identity, birthday, reserid], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})



app.get('/reservations', (req, res) => {
    const userid = req.query.userid;
    DBconnection.query("SELECT * FROM reservations WHERE USERID = ? AND STATUS <> 'Cancelled' AND STATUS <> 'Pending'",
    [userid],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})



app.get('/reservationsmonthscale', (req, res) => {
    const userid = req.query.userid;
    const month = req.query.month;
    const year = req.query.year
    DBconnection.query("SELECT * FROM reservations WHERE USERID = ? AND MONTH = ? AND YEAR = ? AND STATUS <> 'Cancelled' AND STATUS <> 'Pending'",
    [userid, month, year],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.get('/cancelledreservations', (req, res) => {
    const userid = req.query.userid;
    const status = "Cancelled"
    DBconnection.query("SELECT * FROM reservations WHERE USERID = ? AND STATUS = ?",
    [userid, status],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

app.get('/pendingreservations', (req, res) => {
    const userid = req.query.userid;
    const status = "Pending"
    DBconnection.query("SELECT * FROM reservations WHERE USERID = ? AND STATUS = ?",
    [userid, status],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }

    })
})

//tilephuthu

app.get('/tilephuthu', (req, res) => {
    DBconnection.query("SELECT * FROM tilephuthu", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get('/revenuetomonth', (req, res) => {
    DBconnection.query("SELECT * FROM tilephuthu", (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.put('/updatestatus', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    DBconnection.query("UPDATE reservations SET STATUS = ? WHERE ID = ?", 
    [status, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.put('/updatereceiptstatus', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    DBconnection.query("UPDATE rental_receipt SET STATUS = ? WHERE RECID = ?", 
    [status, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.put('/updatestatusconfirmed', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    const confirmed = req.body.confirmed

    DBconnection.query("UPDATE reservations SET STATUS = ?, CONFIRMED = ? WHERE ID = ?", 
    [status, confirmed, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})
//reservation detail

app.post('/createreservationdetail', (req, res) => {
    console.log(req.body)
    const customerid = req.body.customerID;
    const userid = req.body.userid;
    const reserID = req.body.reserID;
    const fullname = req.body.fullname;
    const custype = req.body.custype;
    const identity = req.body.identity;
    const birthday = req.body.birthday
    const paycusid = req.body.paycusid;
    const address = req.body.address
    const country = req.body.country
    const type = req.body.type
    
    DBconnection.query('INSERT INTO reservation_detail (USERID, RID, CID, FULL_NAME, TYPE, COUNTRY, IDENTITY, ADDRESS, BIRTHDAY) VALUES (?,?,?,?,?,?,?,?,?)',
        [userid, reserID, customerid, fullname, type, country, identity, address, birthday], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('value inserted')
            }
        }
    );
})



app.get('/reservationdetail', (req, res) => {
    const rid = req.query.ReservationId;
    DBconnection.query("SELECT * FROM reservation_detail WHERE RID = ?",
    [rid],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})


app.get('/blocktime', (req, res) => {
    const userid = req.query.userid;
    const room = req.query.room
    const id= req.query.id
    DBconnection.query("SELECT ARRIVAL, DEPARTURE FROM reservations WHERE ROOM = ? AND ID <> ? AND USERID = ?",
    [room, id, userid],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})

app.get('/blocktimeonedit', (req, res) => {
    const userid = req.query.userid;
    const room = req.query.room
    DBconnection.query("SELECT ARRIVAL, DEPARTURE FROM reservations WHERE ROOM = ? AND USERID = ?",
    [room, userid],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})



// app.get('/rentalreceipt', (req, res) => {
//     const userid = req.query.userid;
//     const status = "Confirmed"
//     DBconnection.query("SELECT * FROM reservations WHERE USERID = ? AND STATUS = ?",
//     [userid, status],
//     (err, result) => {
//         if (err) {
//             console.log(err)
//             res.status(500).send('Error retrieving data');
//         }
//         else {
//             res.send(result)
//         }

//     })
// })

app.get('/rentalreceipt', (req, res) => {
    const userid = req.query.userid;
    const status = "Confirmed"
    DBconnection.query("SELECT * FROM rental_receipt WHERE USERID = ?",
    [userid, status],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})

app.post('/addreceiptcus', (req, res) => {
    console.log(req.body)
    const userid = req.body.userid;
    const rid = req.body.rid;
    const paycusid = req.body.paycusid;
    const address = req.body.address;
    const name = req.body.name;
    const month = req.body.month;
    const year = req.body.year;
    const peoplenumb = req.body.peoplenumb
    const printday = req.body.printday;
    const price = req.body.price;
    const rentdays = req.body.rentdays;
    const room = req.body.room;
    const roomtype = req.body.roomtype
    const status = "Pending"
    
    DBconnection.query('INSERT INTO rental_receipt (USERID, CID, ROOM, ROOM_TYPE, RID, FULL_NAME, ADDRESS, RENTDAYS, PRINTDAY, MONTH, YEAR, PEOPLE_NUMB, PRICE, STATUS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [userid, paycusid, room, roomtype, rid, name, address, rentdays, printday, month, year, peoplenumb, price, status], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                 // Retrieve the generated Reservation ID
                res.send(result); // Include the Reservation ID in the response
            }
        }
    );
})

app.put('/addreceiptstatus', (req, res) => {
    console.log(req.body)
    const userid = req.body.userid;
    const rid = req.body.rid;
    const status = req.body.status;
    
    
    DBconnection.query('UPDATE rental_receipt SET STATUS = ? WHERE RID = ?',
        [status, rid], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                 // Retrieve the generated Reservation ID
                res.send(result); // Include the Reservation ID in the response
            }
        }
    );
})


app.get('/receiptdetail', (req, res) => {
    const userid = req.query.userid;
    const cid = req.query.cid;
    const status = "Confirmed";
    DBconnection.query("SELECT * FROM reservations WHERE PAYCUSID = ? AND USERID = ?",
    [cid, userid,],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})

app.delete('/deleterentalreceipt/:id', (req,res) => {
    const id=req.params.id
    DBconnection.query("DELETE FROM rental_receipt WHERE RID = ?", [id], (err,result) =>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    })
})

app.put('/updaterentaldescription', (req, res) => {
    const id = req.body.recid;
    const description = req.body.description;

    DBconnection.query("UPDATE rental_receipt SET DESCRIPTION = ? WHERE RECID = ?", 
    [description, id], (err,result) => {
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post('/createrevenue', (req, res) => {
    const userid = req.body.userid;
    const roomtype = req.body.roomtype;
    const rtid = req.body.rtid;

    DBconnection.query('INSERT INTO revenue (USERID, RTID, TYPE) VALUES (?,?,?)',
        [userid, rtid, roomtype], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result); 
            }
        }
    );
})

app.get('/revenue', (req, res) => {
    const userid = req.query.userid;
    const month = req.query.month;
    const year = req.query.year;
    DBconnection.query("SELECT * FROM reservations WHERE USERID = ? AND MONTH = ? AND YEAR = ? AND STATUS <> 'Cancelled' AND STATUS <> 'Pending'",
    [userid, month, year],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})

const revenuequery = `SELECT rental_receipt.ROOM_TYPE AS TYPE, SUM(rental_receipt.PEOPLE_NUMB) AS TOTAL_CUSTOMERS, SUM(rental_receipt.PRICE) AS TOTAL_REVENUE
FROM rental_receipt
WHERE rental_receipt.MONTH = ? AND rental_receipt.YEAR = ? AND rental_receipt.STATUS = 'Paid'
GROUP BY rental_receipt.ROOM_TYPE`

app.get('/getrevenue', (req, res) => {
    // const userid = req.query.userid;
    const month = req.query.month;
    const year = req.query.year;
    DBconnection.query(revenuequery,
    [month, year],
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving data');
          } else {
            const totalRevenueSum = result.reduce((sum, row) => sum + row.TOTAL_REVENUE, 0);
            const dataWithRatio = result.map(row => ({
              ...row,
              RATIO: (row.TOTAL_REVENUE / totalRevenueSum) * 100
            }));
            res.send(dataWithRatio);
          }

    })
})


app.post('/createinvoice', (req, res) => {
    const userid = req.query.userid
    const customer = req.query.name
    const address = req.query.address
    const total = req.query.total
    const rid = req.query.rid
    
    DBconnection.query('INSERT INTO invoiced_receipt (USERID, CUSTOMER, ADDRESS, TOTAL) VALUES (?,?,?,?)',
        [userid, customer, address, total], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
})

app.post('/createinvoicedetail', (req, res) => {
    const userid = req.body.userid
    const inid = req.body.inid
    const room = req.body.room
    const type = req.body.type
    const total = req.body.total
    const rentdays = req.body.rentdays
    
    DBconnection.query('INSERT INTO invoice_detail (USERID, INID, ROOM, ROOM_TYPE, RENTDAYS, TOTAL) VALUES (?,?,?,?,?,?)',
        [userid, inid, room, type, rentdays, total], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('value inserted')
            }
        }
    );
})

app.get('/invoice', (req, res) => {
    const userid = req.query.userid;
    DBconnection.query("SELECT * FROM invoiced_receipt WHERE USERID = ?",
    [userid],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})

app.get('/invoicedetail', (req, res) => {
    const userid = req.query.userid;
    const inid = req.query.inid;

    DBconnection.query("SELECT * FROM invoice_detail WHERE USERID = ? AND INID = ?",
    [userid, inid],
    (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error retrieving data');
        }
        else {
            res.send(result)
        }

    })
})


// app.put('/createrevenue', (req, res) => {
//     const userid = req.body.userid;
//     const roomtype = req.body.roomtype;
//     const rtid = req.body.rtid;

//     DBconnection.query('UPDATE revenue SET RID = ? AND MONTH = ? AND YEAR = ? WHERE RECID = ?',
//         [userid, rtid, roomtype], (err, result) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 res.send(result); 
//             }
//         }
//     );
// })



// app.get('/roomstype', (req, res) => {
//     const userId = req.query.userId;
//     DBconnection.query("SELECT * FROM rooms_type WHERE USERID = ?",
//     [userId],
//     (err, result) => {
//         if (err) {
//             console.log(err)
//             res.status(500).send('Error retrieving data');
//         }
//         else {
//             res.send(result)
//         }

//     })
// })






// app.get('/api', (req, res ) =>{
//     DBconnection.query("SELECT * FROM `danh_muc_phong`", (error,result) => {
//         res.send(result)
//     })
// })

