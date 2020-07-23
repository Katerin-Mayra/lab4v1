var express = require('express');
var router = express.Router();
//////////////////
var sha1 = require("sha1");
var USER=require("../database/users");
var valid=require("./utils/valid")
var JWT=require("jsonwebtoken");
/////////////////
router.get("/user", (req, res) => {
    
    var params = req.query;
    //console.log(params);

    var limit = 100;
    if (params.limit != null) {
    limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
    if (params.order == "desc") {
    order = -1;
    } else if (params.order == "asc") {
    order = 1;
    }
    }
    var skip = 10;
    if (params.skip != null) {
    skip = parseInt(params.skip);
    }
    USER.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
    res.status(200).json(docs);
    
    });
    
    /*
   USER.find({}).
   exec((err,docs)=>{
       if(err){
           res.status(500).json({msn: "Error en el servidor"});
           return;
       }
       res.status(200).json(docs);
       return;
   });*/

});

router.post('/user', async(req, res) => {
var params = req.body;
console.log(req.body);
params["registerdate"] = new Date();

/*
    if(!valid.checkPassword(params.password)){
    res.status(300).json({msn:"EL password necesita una letra mayuscula y Necesita un caracter especial"});
    return;
    }
    */
   
    if(!valid.checkEmail(params.email)){
        res.status(300).json({msn:"COrreo invalido"});
        return;
        }

    //var refObj={name:/[A-Za-z]+$/};
    //var sex={sex:String};
    

    if(!valid.checkParams(params)){
        res.status(300).json({msn:"Nombre invalido y mas"});
        return;
    }

    // params.password = sha1(params.password);
    //params.email = sha1(params.email);
    var users = new USER(params);
    var result = await users.save();
    res.status(200).json(result);
});

router.patch("/user", (req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe id"
    });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id: id}, params, (err, docs) => {
    res.status(200).json(docs);
    });
});

router.delete("/user", async(req, res) => {
        if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe id"
        });
        return;
}
var r = await USER.remove({_id: req.query.id});
res.status(300).json(r);
});

router.post("/login", async(req, res) => {
    var body = req.body;
    //console.log(body);
    if (body.email == null) {
        res.status(300).json({msn: "El email es necesario"});
             return;
    }
    if (body.password == null) {
        res.status(300).json({msn: "El password es necesario"});
        return;
    }
    var  datos1=USER.name;
    var results = await USER.find({email: body.email, password: (body.password)});
    //console.log(datos1)
    if (results.length == 1) {
        res.status(200).json({msn: "Bienvenido " + body.email + " al sistema"});
        return;
    }
    res.status(200).json({msn: "Credenciales incorrectas"});
});


module.exports = router;