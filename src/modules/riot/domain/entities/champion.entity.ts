export class Champion {
  version: string = '';
  id: string = '';
  key: string = '';
  name: string = '';
  title: string = '';

  constructor(data: Partial<Champion>) {
    Object.keys(data).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key as keyof Champion] = data[key as keyof Champion];
      }
    });
  }
}
