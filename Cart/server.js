const express = require('express');
const cors = require('cors');
const app = express();


require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT_CART_SERVICE || 9010;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/cart", require("./routes/cartRouter"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
