import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Role } from '../roles/entities/role.entity';
import { UserRolesEntity } from '../user_roles/entities/user_roles.entity';
import { RelationshipStudentEntity } from '../relationship_student/entities/relationship_student.entity';
import { TeachersInfoEntity } from '../teachers_info/entities/teachers_info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      UserRolesEntity,
      RelationshipStudentEntity,
      TeachersInfoEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [IsExist, IsNotExist, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
