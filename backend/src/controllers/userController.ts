import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type JwtPayload = {
    id: number
}

export class UserController {
    async create(req: Request, res: Response){
        const { name, email, password } = req.body

        const userExists = await userRepository.findOneBy({email})

        if (userExists) {
            throw new BadRequestError('E-mail já existe')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name, 
            email, 
            password: hashPassword
        })

        await userRepository.save(newUser)

        const {password: _, ...user} = newUser

        res.status(201).json(user)
        return
    }

    async getProfile(req: Request, res: Response){
        console.log(req.user);
        return
    }
}