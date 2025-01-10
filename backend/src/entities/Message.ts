import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Chat } from "./Chat";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chat, chat => chat.id)
    @JoinColumn({ name: 'chat_id' })
    chat: Chat;

    @Column({ type: 'enum', enum: ['user', 'bot'] })
    sender: 'user' | 'bot';

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    sentAt: Date;
}
