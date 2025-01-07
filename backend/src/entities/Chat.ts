import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User"; // Assumindo que a entidade User já foi definida
import { Bot } from "./Bot"; // Assumindo que a entidade Bot já foi definida

@Entity('chats')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Bot, bot => bot.id)
    @JoinColumn({ name: 'bot_id' })
    bot: Bot;

    @Column({ type: 'enum', enum: ['open', 'closed'], default: 'open' })
    status: 'open' | 'closed';

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
