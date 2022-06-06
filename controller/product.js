const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');



const product = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/product.json')).toString())


// new id creator
const creator = ()=>{
    if(product.length > 0){
        return product[product.length - 1].id + 1;
    }else{
        return 1
    }

}


// All data get
const getAlldata = (req,res)=>{

    res.status(200).json(product)
}


// new data post
const postNewData = (req,res)=>{

    if(req.body.name && req.body.photo && req.body.price ){

        product.push({
            id  : creator(),
            name : req.body.name,
            photo : req.body.photo,
            price : req.body.price
        });

        fs.writeFileSync(path.join(__dirname, '../data/product.json'), JSON.stringify(product) );
        res.status(200).json('data create success');
    }else{
        res.status(404).json('sdfdsf')
    }
}

// single data get
const getSingleData = (req,res)=>{
    let id = req.params.id

    if(product.some(data => data.id == id)){
        let data = product.find(data => data.id == id);
        res.status(200).json(data)
    }else{
        res.status(201).json('data not found');
    }
}

// data delete
const ddeleteData = (req,res)=>{
    let id = req.params.id;
    if(product.some(data => data.id == id)){
        let data =  product.filter(data => data.id != id)
        res.status(200).json('data delete success');
        fs.writeFileSync(path.join(__dirname, '../data/product.json'), JSON.stringify(data));
    }else{
        res.send('no data');
    }


}

// Edit data
const patchData = (req,res)=>{
    let id = req.params.id;
    if(product.some(data => data.id == id)){
     let index =    product.findIndex(data => data.id == id);
     product[index] ={
         id : parseInt(id),
         name : req.body.name,
         photo : req.body.photo,
         price : req.body.price
     };
     fs.writeFileSync(path.join(__dirname, '../data/product.json'), JSON.stringify(product));
     res.status(200).json('success');
    }else{
        res.send('patch data not')
    }

}




module.exports = {
    getAlldata,
    getSingleData,
    ddeleteData,
    patchData,
    postNewData,
}