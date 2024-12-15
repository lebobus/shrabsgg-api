export abstract class BaseMapper<E, M> {
  /**
   *
   */
  abstract entityToModel(entity: E): M;

  /**
   *
   */
  abstract modelToEntity(model: M): E;
}
