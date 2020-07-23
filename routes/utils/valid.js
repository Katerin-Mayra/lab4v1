var express = require('express');
var router = express.Router();
//////////////////
//var USER=require("../database/users");

var valid = {
    checkParams: function(evalueobj,refobj ) {
        //refobj={name:"String",sex:"String"};
            refobj=['name','address','sex'];
       // console.log(evalueobj);
     /*  if(typeof evalueobj.name === typeof refobj2.name){
            console.log("bien");
            return true;
        }
        */
        for(i=0;i<refobj.length;i++){
                
                    if(Object.hasOwnProperty.bind(evalueobj)(refobj[i])){

                            
                                var nom=evalueobj.name;
                                var rtr=evalueobj.address;
                                var sexx=evalueobj.sex;
                                var genm="masculino";
                                var genf="femenino";
                                console.log(sexx);
                                if((!/[A-Z]+$/i.test(nom))||(!/[0-9a-zA-Z# _]+$/.test(evalueobj.address))){
                                    
                                if((!evalueobj.sex==genm)||(!evalueobj.sex==genf)){
                                    console.log("error");
                                    return false;
                                }
                                 
                                }
                               // else 
                                   //return true;
                            
                    }
         
                
            }
        


      //  console.log(refobj.name[Function]);
        console.log(Object.hasOwnProperty.bind(evalueobj)('name'));
      
      

    },
    checkPassword: function (password) {

        return /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}/;
    },
    checkEmail:(email) =>{
        
        return /[\w\.]+@[\w\.]+\.\w{3,3}?$/g.test(email);
    }
    };
    module.exports = valid;