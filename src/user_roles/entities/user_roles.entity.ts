import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity({ name: 'user_roles' })
export class UserRolesEntity extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Column()
  user_id: number;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Column()
  role_id: number;
}
