import { db } from "../config/database.js";

function Listar(callback){

    let ssql = "SELECT * FROM etapa ORDER BY ordem";

    db.query(ssql, function(err, result){
        if(err)
            callback(err, [])
        else
            callback(undefined, result);
    });
}

export default {Listar};