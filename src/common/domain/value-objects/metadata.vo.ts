export class Metadata {
  constructor(
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}

  public updateMetadata(createdAt: Date, updatedAt: Date | null) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
