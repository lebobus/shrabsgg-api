import { Edge } from '../entities/edge.entity';
import { Paginated } from '../entities/paginated.entity';

export abstract class CursorRepository<E, M> {
  abstract createEdge(
    instance: M,
    cursor: keyof E,
    innerCursor?: string,
  ): Edge<E>;
  abstract decode(value: string): string;
  abstract encode(value: string): string;
  abstract relayPaginate(
    instances: M[],
    endCursor: null | string,
    startCursor: null | string,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    length: number,
    first: number,
    orderBy?: string,
  ): Paginated<E>;
}

export const CursorRepositoryToken = Symbol('CursorRepository');
