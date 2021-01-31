const express = require('express')
const KhaiBao = express.Router()
const conn = require('./../model/connect')



KhaiBao.get('/', (req,res,next)=>{
    let query
    if(req.query.fromId !== undefined && req.query.fromId > 0){
        query = q.getKhaiBaoFromId(req.query.fromId)
    }else{
        query = q.getKhaiBao()
    }

    conn.query(query)
    .then(({rows})=>{
        req.KhaiBao = rows
        next()
    })
    .catch(err => res.send(err))
}, async (req,res,next)=>{
    let KhaiBaoIds = ``
    req.KhaiBao.forEach(e=>{
        KhaiBaoIds = `${KhaiBaoIds}${e.id}, `
    })
    req.KhaiBaoIds = KhaiBaoIds.slice(0, -2)
    next()
}, async (req,res,next)=>{
    let {rows}  = await conn.query(q.getPhuongTien(req.KhaiBaoIds))
    for(let i=0; i< req.KhaiBao.length; i++){
        req.KhaiBao[i].PhuongTien = rows.filter(x => x.khaibaoid == req.KhaiBao[i].id)
    }
    next()
}, async (req,res,next)=>{
    let {rows}  = await conn.query(q.getDiaDiem(req.KhaiBaoIds))
    for(let i=0; i< req.KhaiBao.length; i++){
        req.KhaiBao[i].DiaDiem = rows.filter(x => x.khaibaoid == req.KhaiBao[i].id)
    }
    next()
}, async (req,res,next)=>{
    let {rows}  = await conn.query(q.getLichTrinhDuKien(req.KhaiBaoIds))
    for(let i=0; i< req.KhaiBao.length; i++){
        req.KhaiBao[i].LichTrinhDuKien = rows.filter(x => x.khaibaoid == req.KhaiBao[i].id)
    }
    next()
}, async (req,res,next)=>{
    let {rows}  = await conn.query(q.getTinhTrangSucKhoe(req.KhaiBaoIds))
    for(let i=0; i< req.KhaiBao.length; i++){
        req.KhaiBao[i].TinhTrangSucKhoe = rows.filter(x => x.khaibaoid == req.KhaiBao[i].id)
    }
    next()
}, async (req,res,next)=>{
    let {rows}  = await conn.query(q.getTinhTrangXetNghiem(req.KhaiBaoIds))
    for(let i=0; i< req.KhaiBao.length; i++){
        req.KhaiBao[i].TinhTrangXetNghiem = rows.filter(x => x.khaibaoid == req.KhaiBao[i].id)
    }
    next()
}, (req,res,next)=>{
    res.send(req.KhaiBao)
},)

KhaiBao.post('/', async function (req,res){

    let {rows} = await conn.query(q.insertKhaiBao(req.body))
    let KhaiBao = rows[0]

    KhaiBao.PhuongTien = []
    KhaiBao.DiaDiem = []
    KhaiBao.LichTrinhDuKien = []
    KhaiBao.TinhTrangSucKhoe = []
    KhaiBao.TinhTrangXetNghiem = []

    for(let i = 0; i < req.body.PhuongTien.length; i++){
        let {rows} = await conn.query(q.insertPhuongTien({...req.body.PhuongTien[i], khaibaoid : KhaiBao.id}))
        KhaiBao.PhuongTien.push(rows[0])
    }

    for(let i = 0; i < req.body.DiaDiem.length; i++){
        let {rows} = await conn.query(q.insertDiaDiem({...req.body.DiaDiem[i], khaibaoid : KhaiBao.id}))
        KhaiBao.DiaDiem.push(rows[0])
    }

    for(let i = 0; i < req.body.LichTrinhDuKien.length; i++){
        let {rows} = await conn.query(q.insertLichTrinhDuKien({...req.body.LichTrinhDuKien[i], khaibaoid : KhaiBao.id}))
        KhaiBao.LichTrinhDuKien.push(rows[0])
    }

    for(let i = 0; i < req.body.TinhTrangSucKhoe.length; i++){
        let {rows} = await conn.query(q.insertTinhTrangSucKhoe({...req.body.TinhTrangSucKhoe[i], khaibaoid : KhaiBao.id}))
        KhaiBao.TinhTrangSucKhoe.push(rows[0])
    }

    for(let i = 0; i < req.body.TinhTrangXetNghiem.length; i++){
        let {rows} = await conn.query(q.insertTinhTrangXetNghiem({...req.body.TinhTrangXetNghiem[i], khaibaoid : KhaiBao.id}))
        KhaiBao.TinhTrangXetNghiem.push(rows[0])
    }
    
    res.send(KhaiBao)

})


const q = {
    getKhaiBaoFromId : function(id){
        return {
            text: `SELECT * FROM covid.KhaiBao WHERE ID >= ${id}`,
            values: [],
          }
    },
    getKhaiBao : function(){
        return {
            text: 'SELECT * FROM covid.KhaiBao',
            values: [],
          }
    },
    getPhuongTien : function(KhaiBaoIds){
        return {
            text: `SELECT * FROM covid.PhuongTien WHERE khaibaoid IN (${KhaiBaoIds})`,
            values: [],
        }
    },
    getDiaDiem : function(KhaiBaoIds){
        return {
            text: `SELECT * FROM covid.DiaDiem WHERE khaibaoid IN (${KhaiBaoIds})`,
            values: [],
        }
    },
    getLichTrinhDuKien : function(KhaiBaoIds){
        return {
            text: `SELECT * FROM covid.LichTrinhDuKien WHERE khaibaoid IN (${KhaiBaoIds})`,
            values: [],
        }
    },
    getTinhTrangSucKhoe : function(KhaiBaoIds){
        return {
            text: `SELECT * FROM covid.TinhTrangSucKhoe WHERE khaibaoid IN (${KhaiBaoIds})`,
            values: [],
        }
    },
    getTinhTrangXetNghiem : function(KhaiBaoIds){
        return {
            text: `SELECT * FROM covid.TinhTrangXetNghiem WHERE khaibaoid IN (${KhaiBaoIds})`,
            values: [],
        }
    },
    insertKhaiBao : function(data){
        return {
            text: `INSERT INTO covid.khaibao(
                loaidoituong, hoten, email, manv, loaikhaibao)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [data.LoaiDoiTuong, data.HoTen, data.Email, data.MaNV, data.LoaiKhaiBao],
        }
    },
    insertPhuongTien : function(data){
        return {
            text: `INSERT INTO covid.phuongtien(
                khaibaoid, thoigian, loai, sohieu, lydo, phanloaiphuongtien)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [data.khaibaoid, data.ThoiGian, data.Loai, data.SoHieu, data.LyDo, data.PhanLoaiPhuongTien],
        }
    },
    insertDiaDiem : function(data){
        return {
            text: `INSERT INTO covid.diadiem(
                khaibaoid, thoigian, tendiadiem, tinhtrangdiadiem, diadiemlamviec, phanloaidiadiem)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [data.khaibaoid, data.ThoiGian, data.TenDiaDiem, data.TinhTrangDiaDiem, data.DiaDiemLamViec ,data.PhanLoaiDiaDiem],
        }
    },
    insertLichTrinhDuKien : function(data){
        return {
            text: `INSERT INTO covid.lichtrinhdukien(
                khaibaoid, thoigian, phuongtien, diadiem, lydo)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [data.khaibaoid, data.ThoiGian, data.PhuongTien, data.DiaDiem, data.LyDo],
        }
    },
    insertTinhTrangSucKhoe : function(data){
        return {
            text: `INSERT INTO covid.tinhtrangsuckhoe(
                khaibaoid, tinhtrang)
                VALUES ($1, $2) RETURNING *`,
            values: [data.khaibaoid, data.TinhTrang],
        }
    },
    insertTinhTrangXetNghiem : function(data){
        return {
            text: `INSERT INTO covid.tinhtrangxetnghiem(
                khaibaoid, mucxetnghiem, ketqua)
                VALUES ($1, $2, $3) RETURNING *`,
            values: [data.khaibaoid, data.MucXetNghiem, data.KetQua],
        }
    }
} 



module.exports = KhaiBao