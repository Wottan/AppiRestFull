import {JsonController,Controller, Param, Body, Get, Post, Put, Delete,Render,Req,Res} from "routing-controllers";
import {User} from "../entity/User";
import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {EntityFromBody} from "typeorm-routing-controllers-extensions";
import { throwStatement } from "babel-types";

@JsonController()
export class UserControladorVista{

    private userRepository = getRepository(User);
    
    
    @Render("index.pug")
    @Get("/users")
    async getAll() {  
        return {
            message: "these params are used",
            users: await this.userRepository.find()
        };
    }

    @Render("usuario.pug")
    @Get("/users/:id")
    async getOne(@Param("id") id: number) {
        return {
            message:"Usuario",
            user: await this.userRepository.findOne(id)
        }
    }

    @Render("formUsuario.pug")
    @Get("/formulario")
    get(){
        return {
            title:"Formulario",
            message:"Formulario de Registro"
        };
    }

    @Post("/formulario")
    async save(@Body() user: User) {
        console.log(user);
        return await this.userRepository.save(user);
    }

    @Put("/users/:id")
    async put(@Param("id") id: number, @Body() user: User) {
       return "Updating a user...";
    }

    @Delete("/users/:id")
    async remove(@Param("id") id: number) {
       let user=await this.userRepository.findOne(id);
       return await this.userRepository.remove(user);
    }
}


