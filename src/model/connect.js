const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '10.254.61.68',
  database: 'cus360',
  password: '123456789',
  port: 5432,
})

pool.connect().then(()=>{
    console.log('ket noi thanh cong')
}).catch(err=>{console.log(err)})

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })


module.exports  = pool