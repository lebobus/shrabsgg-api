import { EntityId } from '../entity-id.vo';
import { Path, RelationPath } from '../relation-path.vo';

describe('Relation path', () => {
  it('Should create a relation path from a string', () => {
    const path = `organizations/${EntityId.create()}/address/${EntityId.create()}`;
    const relation = RelationPath.create(path);

    expect(relation).toBeInstanceOf(RelationPath);
    expect(relation.parentEntityName).toBe('organizations');
    expect(relation.toString()).toBe(path);
  });

  it('Should append a path to a relation path', () => {
    const path = `organizations/${EntityId.create()}`;
    const relation = RelationPath.create(path);

    const entity = EntityId.create();
    relation.append(new Path('address', entity));

    expect(relation.parentEntityName).toBe('organizations');
    expect(relation.value).toBe(`${path}/address/${entity}`);
  });

  it('Should be the same', () => {
    const uid = EntityId.create();
    const path = `organizations/${uid}`;
    const relation = RelationPath.create(path);

    expect(relation.isFromPath(new Path('organizations', uid))).toBeTruthy();
    expect(relation.isFromString(path)).toBeTruthy();
  });

  it('Should contains', () => {
    const uid = EntityId.create();
    const uidEstablishment = EntityId.create();
    const path = `organizations/${uid}/establishments/${uidEstablishment}`;
    const relation = RelationPath.create(path);

    expect(relation.isFromString(`organizations/${uid}`)).toBeTruthy();
    expect(
      relation.isFromString(`establishments/${uidEstablishment}`),
    ).toBeTruthy();
    expect(relation.isFromString(path)).toBeTruthy();
    expect(relation.isFromString(`xxxx/${uid}`)).toBeFalsy();

    expect(relation.isFromPath(new Path('organizations', uid))).toBeTruthy();
    expect(
      relation.isFromPath(new Path('establishments', uidEstablishment)),
    ).toBeTruthy();
    expect(
      relation.isFromPath(
        new Path('organizations', uid),
        new Path('establishments', uidEstablishment),
      ),
    ).toBeTruthy();
    expect(
      relation.isFromPath(
        new Path('xxx', uid),
        new Path('establishments', uidEstablishment),
      ),
    ).toBeFalsy();
    expect(relation.isFromPath(new Path('xxx', uid))).toBeFalsy();
  });
});
