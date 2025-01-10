import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1736515408243 implements MigrationInterface {
    name = 'Default1736515408243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sender\` enum ('user', 'bot') NOT NULL, \`content\` text NOT NULL, \`sentAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`chat_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_7540635fef1922f0b156b9ef74f\` FOREIGN KEY (\`chat_id\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_7540635fef1922f0b156b9ef74f\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
    }

}
