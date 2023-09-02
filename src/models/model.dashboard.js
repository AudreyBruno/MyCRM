import {db} from '../config/database.js';

function DashboardResumos(id_usuario, callback){
    
    let json = {};
    let ssql = "SELECT sum(valor) as valor_mes, count(*) as qtd_mes ";
    ssql += "FROM negocio ";
    ssql += "WHERE dt_cadastro >= DATE_FORMAT(NOW(), '%Y-%m-01') ";
    ssql += "AND dt_cadastro <= DATE_FORMAT(LAST_DAY(NOW()), '%Y-%m-%d') ";
    ssql += "AND id_usuario = ? ";

               
    db.query(ssql, [id_usuario], function(err, result) {
        if (err) {            
             callback(err, []);
        } else {
            
            json.valor_mes = result[0].valor_mes;
            json.qtd_mes = result[0].qtd_mes;

            ssql = "SELECT  sum(valor) as valor_dia, count(*) as qtd_dia ";
            ssql += "FROM negocio ";
            ssql += "WHERE dt_cadastro >= DATE_FORMAT(NOW(), '%Y-%m-%d') ";
            ssql += "AND dt_cadastro < DATE_FORMAT(NOW() + INTERVAL 1 DAY, '%Y-%m-%d') ";
            ssql += "AND id_usuario = ? ";            

            db.query(ssql, [id_usuario], function(err, result) {
                if (err) {            
                     callback(err, []);
                } else {                        

                    json.valor_dia = result[0].valor_dia;
                    json.qtd_dia = result[0].qtd_dia;

                    callback(undefined, json);
                }
            });
        }
    
    });        
}

function DashboardNegociosAnual(callback){

    let filtro = [];    
    let ssql = "SELECT month(dt_cadastro) as mes, sum(valor) as vl_total ";
    ssql += "FROM negocio ";
    ssql += "WHERE   dt_cadastro >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-%d') ";
    ssql += "GROUP BY month(dt_cadastro) ";
    ssql += "ORDER BY 1 ";
               
    db.query(ssql, filtro, function(err, result) {
        if (err) {            
             callback(err, []);
        } else {                   
            
            // Titulos...
            let json = [["Mês", "Valor"]];

            // Valores...
            result.map((r) => {
                json.push([r.mes, r.vl_total]);
            })
            
             callback(undefined, json);
        }
    });        
}






export default {DashboardResumos, DashboardNegociosAnual};