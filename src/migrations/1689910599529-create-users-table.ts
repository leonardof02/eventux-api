import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersTable1689910599529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" (
                "user_id" int PRIMARY KEY,
                "full_name" varchar NOT NULL,
                "email" varchar(100) UNIQUE NOT NULL,
                "password" varchar NOT NULL,
                "faculty_id" int NOT NULL,
                "profile_img_url" varchar,
                "is_admin" boolean
              );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "users" IF EXISTS`
        )
    }
    
}
