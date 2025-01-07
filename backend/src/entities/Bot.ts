import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('bots')
export class Bot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    img: string;

    @Column({ type: 'text' })
    descricao: string;

    @Column({ type: 'varchar', length: 255 })
    endpoint: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
