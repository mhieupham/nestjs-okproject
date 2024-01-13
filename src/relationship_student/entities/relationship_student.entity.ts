import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@Entity({ name: 'relationship_student' })
export class RelationshipStudentEntity extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Column()
  user_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Column()
  student_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Column()
  relationship_type: number;
}
