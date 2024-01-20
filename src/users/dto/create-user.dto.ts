import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { IsDateFormat } from '../../validators/date-of-birth.validator';
import { IsValidRoleArray } from '../../validators/role-array.validator';
import { PhoneNumberValidator } from '../../validators/phone-number.validator';
import { PasswordValidator } from '../../validators/password.validator';

export class CreateUserDto {
  @ApiProperty({ example: 123456781234 })
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'identificationNumberAlreadyExists',
  })
  @IsNumberString({}, { message: 'Identification number must be a number.' })
  @Length(12, 12, {
    message: 'Identification number must be exactly 12 digits long.',
  })
  identification_number: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'User1234)' })
  @MinLength(8)
  @IsNotEmpty()
  @Validate(PasswordValidator)
  password: string;

  @ApiProperty({ example: 'Nguyen Van A' })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '0123456789' })
  @Validate(PhoneNumberValidator)
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ example: [1, 2] })
  @Validate(IsValidRoleArray)
  roles: number[];

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  gender_id: number;

  @ApiProperty({ example: '1999-11-11' })
  @Validate(IsDateFormat, {
    message: 'Invalid birthdate format. Use yyyy-mm-dd.',
  })
  @IsNotEmpty()
  date_of_birth: string;

  @ApiProperty({ example: 'Ha dong, ha noi' })
  @IsNotEmpty()
  hometown: string;

  @ApiProperty({ example: 'Ha dong, ha noi' })
  @IsNotEmpty()
  place_residence: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  province_id: number;

  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  district_id: number;

  @ApiProperty({ example: '1999-11-11' })
  @Validate(IsDateFormat, {
    message: 'Invalid date_of_issue format. Use yyyy-mm-dd.',
  })
  @IsNotEmpty()
  date_of_issue: string;

  @ApiProperty({ example: 'Ha noi' })
  @IsNotEmpty()
  place_of_issue: string;

  @ApiProperty({ example: 'abc.jpg' })
  @IsNotEmpty()
  front_of_identification_card_image_url: string;

  @ApiProperty({ example: 'def.jpg' })
  @IsNotEmpty()
  back_of_identification_card_image_url: string;

  @ApiProperty({ example: [1, 2] })
  @IsOptional()
  student_ids: number[];

  @ApiProperty({ example: 1 })
  @IsOptional()
  teacher_unit_work: number;

  @ApiProperty({ example: 'ha dong, ha noi' })
  @IsOptional()
  teacher_work_place: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  teacher_major: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  teacher_position: number;

  @ApiProperty({ example: '1999-11-11' })
  @Validate(IsDateFormat, {
    message: 'Invalid teacher_employment_start_date format. Use yyyy-mm-dd.',
  })
  @IsOptional()
  teacher_employment_start_date: string;

  @ApiProperty({ example: '1999-11-19' })
  @Validate(IsDateFormat, {
    message: 'Invalid teacher_employment_end_date format. Use yyyy-mm-dd.',
  })
  @IsOptional()
  teacher_employment_end_date: string;
}
