import { RoleEntity } from 'src/modules/roles/role.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values([
        { value: 0, description: 'Admin' },
        { value: 1, description: 'Moderator' },
        { value: 2, description: 'User' },
      ])
      .execute();
  }
}
