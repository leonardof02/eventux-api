import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelantionUserFaculty1689996155945 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`--sql
            ALTER TABLE "users" ADD FOREIGN KEY ("faculty_id")
            REFERENCES "facultys" ("faculty_id") ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`--sql
            ALTER TABLE "users" DROP CONSTRAINT "FK_users_faculty_id_facultys";
        `);
    }
}
