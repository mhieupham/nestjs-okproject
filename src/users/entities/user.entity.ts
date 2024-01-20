import {
  Column,
  AfterLoad,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude, Expose } from 'class-transformer';
import { Gender, StatusUser } from '../../config/app.config';
import { UserRolesEntity } from '../../user_roles/entities/user_roles.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  identification_number: string;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567

  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ type: String, nullable: false })
  full_name: string;

  @Column({ type: Number, nullable: false })
  status: StatusUser;

  @Column({ type: Number, nullable: true })
  phone_number?: string;

  @Column({ type: Number, nullable: false })
  gender_id: Gender;

  @Column({ type: String, nullable: false })
  date_of_birth: string;

  @Column({ type: String, nullable: false })
  hometown: string;

  @Column({ type: String, nullable: false })
  place_residence: string;

  @Column({ type: Number, nullable: false })
  province_id: number;

  @Column({ type: Number, nullable: false })
  district_id: number;

  @Column({ type: String, nullable: false })
  date_of_issue: string;

  @Column({ type: String, nullable: false })
  place_of_issue: string;

  @Column({ type: String, nullable: false })
  front_of_identification_card_image_url: string;

  @Column({ type: String, nullable: false })
  back_of_identification_card_image_url: string;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserRolesEntity, (userRole) => userRole.user_id)
  userRoles: UserRolesEntity[];
}
