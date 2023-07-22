import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1689995811416 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "facultys" (
                "faculty_id" int PRIMARY KEY,
                "name" varchar(100) NOT NULL,
                "logo_url" varchar
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "facultys" IF EXISTS`);
    }
}
