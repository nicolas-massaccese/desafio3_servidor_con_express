
const express = require('express')

const app = express();


const fs = require ('fs');


class Container {

    constructor (fileName) {
        this.fileName = fileName
    }

    getAll () {
        const fileData =  fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        return (JSON.parse(fileData));
    }
}


const product = new Container ('products');


function showDataJason(showData){
    let dataHtml = '';
    showData.forEach(data => {
        dataHtml +=`<p>${data.id}</p>
        <p>${data.title}</p>
        <p>${data.price}</p>
        <img src="${data.thumbnail}" width="100" height="100">`
    });
    
    app.get('/products', (req, res) => {
        res.send(`${dataHtml}`);
    });
}


function showRandomDataJason(data){
    app.get('/productRandom', (req, res) => {
        let random = data[Math.floor(Math.random() * data.length)];
        res.send(`<p>${random.id}</p>
        <p>${random.title}</p>
        <p>${random.price}</p>
        <img src="${random.thumbnail}"  width="100" height="100">`)
    });
};


const dataJason = product.getAll();

showDataJason(dataJason)
showRandomDataJason(dataJason)

const PORT = 8080;

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));

