const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;


//use Middle ware.......

app.use(cors());
app.use(express.json());




app.get('/', (eq, res) =>{
          res.send('server is running....!')
})

app.listen(port, ()=>{
          console.log('Curd server is running!!');
})