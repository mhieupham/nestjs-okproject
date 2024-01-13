import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { UserRolesEntity } from '../../user_roles/entities/user_roles.entity';

@Entity({ name: 'role' })
export class Role extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column()
  name?: string;

  @Column()
  display_name?: string;

  @IsNumber()
  @Column()
  sort?: string;

  @OneToMany(() => UserRolesEntity, (userRole) => userRole.role_id)
  userRoles: Role[];
}
