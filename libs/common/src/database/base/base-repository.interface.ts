export interface IRepository<T> {
  create(dto: T | any): Promise<T>

  findOne(condition?: object, projection?: string[]): Promise<T>

  find(condition: object, options?: object): Promise<T[]>

  update(id: string, dto: Partial<T>): Promise<T>

  softDelete(id: string): Promise<boolean>

  delete(id: string): Promise<boolean>
}
