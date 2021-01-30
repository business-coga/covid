const express = require('express')
const schedule = express.Router()
const conn = require('./../model/connect')

schedule.get('/', (req,res)=>{
    conn.query(query.getSchedule())
    .then(({rows})=>{
        res.send(rows)
    })
    .catch(err => res.send(err))
})

schedule.post('/', (req,res)=>{
    conn.query(query.insertSchedule(req.body))
    .then(({rows})=>{
        conn.query(`SELECT * FROM covid.Schedule
        ORDER BY ID DESC
        LIMIT 1`)
        .then(({rows})=>{
            res.send(rows)
        })
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
})


const query = {
    getSchedule : ()=>{
        return `SELECT * FROM covid.schedule`
    },
    insertSchedule : (d)=>{
        return `INSERT INTO covid.schedule(fromdate, fromtime, userid, description, note, vehicle, "CreateDate")
            VALUES ('${d.fromDate}','${d.fromTime}','${d.userId}','${d.description}', '${d.note}', '${d.vehicle}', NOW());`
    }
}

module.exports = schedule