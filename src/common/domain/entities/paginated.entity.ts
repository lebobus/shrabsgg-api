import { Exclude, Expose } from 'class-transformer';

import { Edge } from './edge.entity';
import { PageInformations } from './page-informations.entity';

export class Paginated<T> {
  @Exclude()
  private readonly _edges: Edge<T>[];
  @Exclude()
  private _pageInformations: PageInformations;

  constructor(edges: Edge<T>[], pageInfo: PageInformations) {
    this._edges = edges;
    this._pageInformations = pageInfo;
  }

  public addEdge(edge: Edge<T>) {
    this._edges.push(edge);
  }

  public updatePageInformation(updatedPageInformations: PageInformations) {
    this._pageInformations = updatedPageInformations;
  }

  @Expose()
  get edges(): Edge<T>[] {
    return this._edges;
  }

  @Expose()
  get pageInformations(): PageInformations {
    return this._pageInformations;
  }
}
