const dbConfig = require('../configs/db'),
connection = require('../utils/connection'),
query = require('../utils/query') ;
const Catbreed = require('../models/catbreed-model');

exports.getCatBreed = async (req , res) => {
    console.log('getCatBreed', res)
    let sql = `SELECT * FROM catbreed`;
    const conn = await connection(dbConfig).catch(e => console.log(e));
    const data = await query(conn, sql).catch(console.log);

    res.status(200).json({
        status: 200,
        data: data || [],
        message: "List retrieved successfully",
    });
}

exports.postCatBreed = async (req , res) => {
    const _data = new Catbreed(req.body);
    _data.validation()

    if(_data.errors.length){
        res.status(400).json({
            status : 400,
            message : _data.errors
        })
    }
    else{
        let sql = `INSERT INTO catbreed(breedname, coatDescription, description) VALUES (?)`;
        let values = [
            _data.breedname,
            _data.coatDescription,
            _data.description
        ];

        const conn = await connection(dbConfig).catch(e => console.log(e));
        const data = await query(conn, sql, [values])
        .catch(console.log);

        if(data.affectedRows > 0){
            res.status(200).json({
                status: 200,
                message: "Added successfully"
            })
        }else{
            res.status(200).json({
                status: 200,
                message: data
            })
        }
    }
};