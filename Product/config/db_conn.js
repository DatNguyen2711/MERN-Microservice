const mongoose = require('mongoose');
const redis = require('redis');
require('dotenv').config();
const Product = require('../models/productModel'); 

const redisClient = redis.createClient();


// const dbHost = process.env.DB_HOST || 'localhost'
// const dbPort = process.env.DB_PORT || 27017
// const dbName = process.env.DB_NAME || 'my_db_name'
// const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
//     .catch(err => console.log(err));

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_cluster = process.env.MONGO_CLUSTER;

mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@${mongo_cluster}.q0ksucl.mongodb.net/?retryWrites=true&w=majority`
    , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
    .catch(err => console.log(err));


const imageLinks = [
    "https://static.zara.net/assets/public/56a3/574a/0be142b6a8da/01dd7ccf51cd/1687859308602/1687859308602.jpg?ts=1701338209097",
    "https://static.zara.net/assets/public/824f/7048/39394a5484f1/7964dd8419a3/03833404500-a2/03833404500-a2.jpg?ts=1705667453910&w=412",
    "https://thaithanh.com.vn/image/cache/catalog/product/6861411505211-2823-0x0.jpg",
    "https://static.zara.net/assets/public/8d39/6a75/4588424b8b84/5108ea994842/06318029800-e1/06318029800-e1.jpg?ts=1711120366434&w=1920",
    "https://static.zara.net/assets/public/f6bc/5e6f/bf9c49f1868c/a8f978485f18/02702282800-e2/02702282800-e2.jpg?ts=1709033207442&w=1920",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Cx5LGtdHsdn8RxG2OYesPpg1Tpi-CVZeDDsvSF_LvgPMHRBtRTUbxAeRpE_toJSDRsA&usqp=CAU",
    "https://media.karousell.com/media/photos/products/2023/6/12/zara_jacket_1686576404_5955a4b1_progressive.jpg",
    "https://static.zara.net/assets/public/a8e3/0b3f/2b0446e4affe/b9ea2b0e9d56/1677075914080/1677075914080.jpg?ts=1704655637158&w=824",
    "https://static.zara.net/photos///2023/I/0/1/p/3427/793/800/12/w/824/3427793800_1_1_1.jpg?ts=1703150714996",
    "https://static.zara.net/photos///2023/I/0/3/p/3548/751/800/2/w/824/3548751800_6_1_1.jpg?ts=1696234034749",
    "https://static.zara.net/assets/public/2086/e60f/f0024ab0b04e/00d75fe634b0/02402760800-e1/02402760800-e1.jpg?ts=1706690963055",
    "https://static.zara.net/photos///2023/I/0/3/p/5854/721/600/2/w/824/5854721600_6_1_1.jpg?ts=1692257736655"
];
const categories = [
    "Action",
    "Adventure",
    "Casual",
    "Horror",
    "Open World",
    "Survival",
    "Simulation",
    "Shooter"
];
const products = [];
for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);

    const product = new Product({
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 1000) + 1,
        description: `Description for product ${i + 1}`,
        category: categories[randomCategoryIndex],
        image: imageLinks[randomIndex] // Sử dụng một liên kết hình ảnh ngẫu nhiên từ mảng imageLinks
    });
    products.push(product);
}

Product.insertMany(products)
    .then(() => {
        console.log('Đã thêm các sản phẩm vào cơ sở dữ liệu.');
    })
    .catch(err => console.error('Lỗi khi thêm sản phẩm:', err));
module.exports = mongoose;