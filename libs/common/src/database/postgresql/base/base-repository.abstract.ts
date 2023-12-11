import { IRepository } from '@app/common/database/base/base-repository.interface'
import { BasePostgreEntity } from './base-entity'
import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm'
import { NotFoundException, Type } from '@nestjs/common'

export abstract class BasePostgreRepository<T extends BasePostgreEntity>
  implements IRepository<T>
{
  protected constructor(
    private readonly model: Type<T>,
    private readonly datasource: DataSource,
  ) {}

  async create(dto: T): Promise<T> {
    const created_data = this.datasource.getRepository(this.model).create(dto)
    return await created_data.save()
  }

  async findOne(condition?: FindOneOptions<T>): Promise<T> {
    return await this.datasource.getRepository(this.model).findOne(condition)
  }

  async find(
    condition: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    options?: FindManyOptions<T>,
  ): Promise<T[]> {
    const [items] = await Promise.all([this.find(condition, options)])

    return items
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    let data = await this.datasource
      .getRepository(this.model)
      .findOneBy({ id } as FindOptionsWhere<T>)

    if (!data) {
      throw new NotFoundException()
    }

    data = this.datasource
      .getRepository(this.model)
      .merge(data, dto as DeepPartial<T>)

    return await data.save()
  }

  async softDelete(id: string): Promise<boolean> {
    const delete_item = await this.datasource
      .getRepository(this.model)
      .findOneBy({ id } as FindOptionsWhere<T>)
    if (!delete_item) {
      return false
    }

    return !!(await this.datasource.getRepository(this.model).softDelete(id))
  }

  async delete(id: string): Promise<boolean> {
    throw !!(await this.datasource.getRepository(this.model).delete(id))
  }
}
