import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./Chat";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name:string

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'text'})
    password: string

    @OneToMany(() => Chat, chat => chat.user)
    chats: Chat[]
    
}