import { request } from "express";
import modelNegocios from "../models/model.negocio.js";

function Listar(req, res){

    let id_usuario = req.query.id_usuario;
    let etapa = req.query.etapa;
    let pagina = req.query.pagina;
    let qtd_reg_pagina = req.query.qtd_reg_pagina;

    if(pagina){

        modelNegocios.ListarPaginado(id_usuario, etapa, pagina, qtd_reg_pagina, function(err, result){
            if(err)
                res.status(500).send(err)
            else
                res.status(200).json(result);
        });

    } else {

        modelNegocios.Listar(id_usuario, etapa, function(err, result){
            if(err)
                res.status(500).send(err)
            else
                res.status(200).json(result);
        });

    }

}

function ListarId(req, res){

    modelNegocios.ListarId(req.params.id_negocio, function(err, result){
        if(err)
            res.status(500).send(err)
        else
            res.status(200).json(result);
    });

}

function Inserir(req, res){

    modelNegocios.Inserir(req.body, function(err, result){
        if(err)
            res.status(500).send(err)
        else
            res.status(201).json(result);
    });

}

function Editar(req, res){

    modelNegocios.Editar(req.params.id_negocio, req.body, function(err, result){
        if(err)
            res.status(500).send(err)
        else
            res.status(200).json(result);
    });

}

function Excluir(req, res) {
    modelNegocios.Excluir(req.params.id_negocio, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
}

export default {Listar, ListarId, Inserir, Editar, Excluir};