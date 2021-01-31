const express = require('express')
const ThongTinCaNhan = express.Router()
const conn = require('./../model/connect')



ThongTinCaNhan.get('/', (req,res)=>{
    let query
    if(req.query.fromId !== undefined && req.query.fromId > 0){
        query = q.getThongTinCaNhanFromId(req.query.fromId)
    }else{
        query = q.getThongTinCaNhan()
    }

    conn.query(query)
    .then(({rows})=>{
        res.send(rows)
    })
    .catch(err => res.send(err))

})

ThongTinCaNhan.post('/', (req,res)=>{
    conn.query(q.insertThongTinCaNhan(req.body))
    .then(({rows})=>{
        res.send(rows)
    })
    .catch(err => res.send(err))
})


const q = {
    getThongTinCaNhan : function(){
        return {
            text: 'SELECT * FROM covid.ThongTinCaNhan',
            values: [],
          }
    },
    getThongTinCaNhanFromId : (id)=>{
        return {
            text: `SELECT * FROM covid.ThongTinCaNhan WHERE ID >= ${id}`,
            values: [],
        }
    },
    insertThongTinCaNhan : function(data){
        return {
            text: `INSERT INTO covid.thongtincanhan(
                congty, phongban, tenlanhdao, emaillanhdao, manv, tennv, chucdanh, sdt, email, diachilamviec, diachilamviechientai, diachicutru, diadiemthuongdi, nguyenquan)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            values: [data.CongTy, data.PhongBan, data.TenLanhDao, data.EmailLanhDao, data.MaNV, data.HoTen, data.ChucDanh, data.SDT,data.Email, data.DiaChiLamViec, data.DiaChiLamViecHienTai, data.DiaChiCuTru, data.DiaDiemThuongDi, data.NguyenQuan],
          }
    },


} 



module.exports = ThongTinCaNhan