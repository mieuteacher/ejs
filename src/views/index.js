import axios from "axios";
import express from "express";
const router = express.Router();
import fs from 'fs';
import path from 'path';

router.use('/meos', (req, res) => {
    fs.readFile(path.join(__dirname, "templates/meo.html"), 'utf-8', async (err, data) => {
        if (err) {
            return res.send("Load ui error")
        }

        let tableContent = ``;

        let meos;

        await axios.get("http://localhost:3000/api/v1/meos")
        .then(res => {
            meos = res.data.data;
        })
        .catch(err => {
            meos = [];
        })

        meos.map((meo, index)  => {
            tableContent += `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${meo.name}</td>
                    <td>${meo.weight}</td>
                    <td>
                        <img style="width: 50px; height: 50px; border-radius: 50%" src="${"http://localhost:3000/meo-images/" + meo.avatar}">
                    </td>
                    <td>
                        <button onclick={deleteMeo(event,${meo.id})} type="button" class="btn btn-primary">Delete</button>
                    </td>
                </tr>
            `
        })

        res.send(data.replace("{{tableContent}}", tableContent));
    })
})

router.use('/create-meo', (req, res) => {
    fs.readFile(path.join(__dirname, "templates/meoCreate.html"), 'utf-8', async (err, data) => {
        if (err) {
            return res.send("Load ui error")
        }
        res.send(data)
    })
})

import ejs from 'ejs';

router.use('/', async (req, res) => {

    
    // res.render(path.join(__dirname, "templates/1.ejs"), {
    //     users: [
    //         {
    //             id: 1,
    //             name: "Phước"
    //         },
    //         {
    //             id: 2,
    //             name: "Hương"
    //         }
    //     ]
    // })

    // let html = await ejs.renderFile(path.join(__dirname, "templates/1.ejs"), 
    //     {
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
    //     }
    // )
    // res.send(html)
})
module.exports = router;