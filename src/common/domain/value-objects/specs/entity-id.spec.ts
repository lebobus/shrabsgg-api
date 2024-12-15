import { EntityId } from '../entity-id.vo';

describe('EntityVo', () => {
  it('Should create an entity id wihtout default value', () => {
    const entityId = EntityId.create();

    expect(entityId).toBeInstanceOf(EntityId);
    expect(entityId.equals(entityId)).toBeTruthy();
  });

  it('Should create an entity id with default value', () => {
    const entityId = EntityId.create('662972c4552092705b6b2169');

    expect(entityId).toBeInstanceOf(EntityId);
    expect(entityId.equals(entityId)).toBeTruthy();
    expect(entityId.value).toBe('662972c4552092705b6b2169');
    expect(entityId.toString()).toBe('662972c4552092705b6b2169');
  });

  it('Should throw an error if entity created with wrong value', () => {
    const t = () => EntityId.create('wrong');
    expect(t).toThrow(Error);
  });
});
