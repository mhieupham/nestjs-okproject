import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'teachers_info' })
export class TeachersInfoEntity extends EntityHelper {
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
  unit_of_work?: number;

  @Column()
  work_place: string;

  @IsNumber()
  @Column()
  major?: number;

  @IsNumber()
  @Column()
  position?: number;

  @Column()
  employment_start_date: string;

  @Column()
  employment_end_date: string;
}
