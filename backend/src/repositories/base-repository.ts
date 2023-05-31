import { Repository, DeepPartial, ObjectLiteral } from "typeorm";
import { IGenericRepository } from "./generic.abstract";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class BaseRepository<T extends DeepPartial<ObjectLiteral>> extends IGenericRepository<T>{
  constructor(
    private _repository: Repository<T>
  ) {
    super();
  }

  getAll(): Promise<T[]> {
    return this._repository.find({})
  }

  get(id: string): Promise<T> {
    return this._repository.findOne(id)
  }

  create(item: T): Promise<T> {
    const obj = this._repository.create(item);
    return this._repository.save(obj)
  }

  update(id: string, item: T) {
    return this._repository.update(id, item);
  }
}