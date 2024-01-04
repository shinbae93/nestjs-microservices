import { IRepository } from '@app/common/database/interface/base-repository.interface'
import { FilterQuery, Model, QueryOptions } from 'mongoose'
import { BaseDocument } from './base-document'

export abstract class BaseMongoRepository<T extends BaseDocument>
  implements IRepository<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model
  }

  async create(dto: T | any): Promise<T> {
    const created_data = await this.model.create(dto)
    return created_data.save() as unknown as T
  }

  async findOne(condition = {}): Promise<T> {
    return await this.model
      .findOne({
        ...condition,
        deleted_at: null,
      })
      .exec()
  }

  async find(
    condition: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    const [items] = await Promise.all([
      this.model.find(
        { ...condition, deleted_at: null },
        options?.projection,
        options,
      ),
    ])

    return items
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    return await this.model.findOneAndUpdate(
      { _id: id, deleted_at: null },
      dto,
      { new: true },
    )
  }

  async softDelete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id)
    if (!delete_item) {
      return false
    }

    return !!(await this.model
      .findByIdAndUpdate<T>(id, { deleted_at: new Date() })
      .exec())
  }

  async delete(id: string): Promise<boolean> {
    const delete_item = await this.model.findById(id)
    if (!delete_item) {
      return false
    }

    return !!(await this.model.findByIdAndDelete(id))
  }
}
