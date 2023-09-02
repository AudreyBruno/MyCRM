import modelEtapas from "../models/model.etapas.js";

function Listar(req, res){

    modelEtapas.Listar(function(err, result){
        if(err)
            res.status(500).send(err)
        else
            res.status(200).json(result);
    })

}

export default {Listar};