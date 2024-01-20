import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { Role } from '../roles/entities/role.entity';
import { UserRolesEntity } from '../user_roles/entities/user_roles.entity';
import { Transactional } from 'typeorm-transactional';
import { RoleName, StatusUser } from '../config/app.config';
import { RelationshipStudentEntity } from '../relationship_student/entities/relationship_student.entity';
import { TeachersInfoEntity } from '../teachers_info/entities/teachers_info.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(UserRolesEntity)
    private userRolesRepository: Repository<UserRolesEntity>,
    @InjectRepository(RelationshipStudentEntity)
    private relationshipStudentRepository: Repository<RelationshipStudentEntity>,
    @InjectRepository(TeachersInfoEntity)
    private teachersInfoRepository: Repository<TeachersInfoEntity>,
  ) {}

  @Transactional()
  async create(createProfileDto: CreateUserDto): Promise<any> {
    const {
      roles,
      student_ids,
      teacher_unit_work,
      teacher_work_place,
      teacher_major,
      teacher_position,
      teacher_employment_start_date,
      teacher_employment_end_date,
    } = createProfileDto;
    const existingRole = await this.rolesRepository.findByIds(roles);
    if (existingRole.length !== roles.length) {
      throw new BadRequestException('Invalid roles.');
    }
    const isParent = existingRole.find((e) => e.name === RoleName.Parents);
    const isTeacher = existingRole.find((e) => e.name === RoleName.Teacher);
    // create user
    const extraParam = {
      status: StatusUser.Pending,
    };
    const user = this.usersRepository.create({
      ...createProfileDto,
      ...extraParam,
    });
    const createUser = await this.usersRepository.save(user);
    const userId = createUser.id;
    // relationshipStudents
    if (isParent && student_ids && student_ids.length > 0) {
      const existingUsers = await this.usersRepository.findByIds(student_ids);
      const relationshipStudents: RelationshipStudentEntity[] = [];
      if (existingUsers.length === student_ids.length) {
        for (const studentId of student_ids) {
          relationshipStudents.push(
            this.relationshipStudentRepository.create({
              user_id: userId,
              student_id: studentId,
              relationship_type: 1, // change this after clear spec
            }),
          );
        }

        await this.relationshipStudentRepository.save(relationshipStudents);
      } else {
        throw new BadRequestException('Invalid student.');
      }
    }

    // teacher_work_unit
    if (isTeacher) {
      // check unit work and work place
      if (!teacher_unit_work && !teacher_work_place) {
        throw new BadRequestException('Work place is required');
      }
      // validate start-date and end-date

      const startDate = new Date(teacher_employment_start_date);
      const endDate = new Date(teacher_employment_end_date);

      if (endDate <= startDate) {
        throw new BadRequestException(
          'End date must be greater than start date',
        );
      }

      const createTeacherInfo = this.teachersInfoRepository.create({
        user_id: userId,
        unit_of_work: teacher_unit_work,
        work_place: teacher_work_place,
        major: teacher_major,
        position: teacher_position,
        employment_start_date: teacher_employment_start_date,
        employment_end_date: teacher_employment_end_date,
      });

      await this.teachersInfoRepository.save(createTeacherInfo);
    }
    // create roles
    const userRoles: UserRolesEntity[] = [];
    for (const role of roles) {
      const userRole = this.userRolesRepository.create({
        user_id: userId,
        role_id: role,
      });

      userRoles.push(userRole);
    }

    return this.userRolesRepository.save(userRoles);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: any = {};
    if (filterOptions?.roles?.length) {
      where.role = filterOptions.roles.map((role) => ({
        id: role.id,
      }));
    }

    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
