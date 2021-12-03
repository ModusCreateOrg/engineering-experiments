import {MigrationInterface, QueryRunner} from "typeorm";

export class addingOrdersTable1638552487019 implements MigrationInterface {
    name = 'addingOrdersTable1638552487019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "locationId" character varying NOT NULL, "customerId" character varying NOT NULL, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Order"`);
    }

}
