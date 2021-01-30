const express = require('express')
const user = express.Router()
const conn = require('./../model/connect')

user.get('/:id', (req,res)=>{
    conn.query(query.getUsersById(req.params.id))
    .then(({rows}) => {
        res.send(rows)
    })
    .catch(err => res.send(err))
})

user.get('/', (req,res)=>{
    conn.query(query.getUsers())
    .then(({rows}) => {
        res.send(rows)
    })
    .catch(err => res.send(err))
})

user.post('/', (req,res)=>{
    console.log(req.body)
    conn.query(query.insertUser(req.body))
    .then(({rows}) => {
        conn.query(`SELECT * FROM covid.User
        ORDER BY ID DESC
        LIMIT 1`)
        .then(({rows})=>{
            res.send(rows)
        })
        .catch(err=> res.send(err))
        
    })
    .catch(err => res.send(err))
})


const query = {
    getUsersById : function(id){
        return `SELECT * FROM covid.User WHERE ID = ${id}`
    },
    getUsers : function (){
        return `SELECT * FROM covid.User`
    },
    insertUser : function(d){
        return `INSERT INTO covid.User (usercode,fullname,email,phone,address,Province, District, Village, BirthDate, Company, Department, Position, Band, "CreateDate")
        VALUES ('${d.UserCode}', '${d.FullName}' , '${d.Email}','${d.Phone}','${d.Address}', '${d.Province}', '${d.District}', '${d.Village}', '${d.BirthDate}', '${d.Company}', '${d.Department}', '${d.Position}', ${d.Band}, NOW())`
    }


} 



module.exports = user