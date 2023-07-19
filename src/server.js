import path from 'path';
/* Kích hoạt .env */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'; // gọi thư viện express
const server = express(); // dùng thư viện express tạo ra server

/* Cấu hình view engine ejs */

//server.set('view engine', 'ejs'); // đuôi file của hàm render sẽ luôn là .ejs

//server.set('views', path.join(__dirname, 'views/templates')); // đường dẫn khi truyền vào render sẽ luôn bắt đầu ở đây!

// server.get('/', (req, res) => {
//     res.render(path.join(__dirname, 'views/templates/1.ejs'), {
//         users: [
//             {
//                 id: 1,
//                 name: "Phước"
//             },
//             {
//                 id: 2,
//                 name: "Hương"
//             }
//         ]
//     });
// });

/* Cấu hình cors cho phép mọi nguồn call api */
import cors from 'cors';
server.use(cors());

/* Cấu hình req.body */
import bodyParser from 'body-parser';
server.use(bodyParser.json())

/* Gọi cấu hình routing và yêu cầu server bật /api với routing đó */
import routerConfig from './routes';
server.use('/api', routerConfig)

/* Gọi cấu hình views */
import viewConfig from './views';
server.use(viewConfig);


/* public folder domain/file */
server.use(express.static("public"));

/* Yêu cầu server lắng nghe tại cổng 3000 trên máy */
server.listen(process.env.PORT, () => {
    console.log("Server đã chạy tại port", process.env.PORT)
})