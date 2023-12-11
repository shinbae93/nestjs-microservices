import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

export class BasePostgreEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string
}
