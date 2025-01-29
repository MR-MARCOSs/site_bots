import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1738175091817 implements MigrationInterface {
    name = 'Default1738175091817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`img\` varchar(255) NOT NULL, \`descricao\` text NOT NULL, \`endpoint\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sender\` enum ('user', 'bot') NOT NULL, \`content\` text NOT NULL, \`sentAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`chat_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('open', 'closed') NOT NULL DEFAULT 'open', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`user_id\` int NULL, \`bot_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` text NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_7540635fef1922f0b156b9ef74f\` FOREIGN KEY (\`chat_id\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_b6c92d818d42e3e298e84d94414\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD CONSTRAINT \`FK_158bd07d32182afaeeb39f75a60\` FOREIGN KEY (\`bot_id\`) REFERENCES \`bots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_158bd07d32182afaeeb39f75a60\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP FOREIGN KEY \`FK_b6c92d818d42e3e298e84d94414\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_7540635fef1922f0b156b9ef74f\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`chats\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`DROP TABLE \`bots\``);
    }

}
