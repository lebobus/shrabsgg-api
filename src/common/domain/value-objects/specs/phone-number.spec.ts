import { PhoneNumber } from '../phone-number.vo';

describe('PhoneNumber', () => {
  it('Should create a phone number', () => {
    const phoneNumber = PhoneNumber.create('+1 438 543 1010');

    expect(phoneNumber).toBeInstanceOf(PhoneNumber);
    expect(phoneNumber.value).toBe('+1 438-543-1010');
  });

  it('Should create a phone number with other format', () => {
    const phoneNumber = PhoneNumber.create('+14385431010');

    expect(phoneNumber).toBeInstanceOf(PhoneNumber);
    expect(phoneNumber.value).toBe('+1 438-543-1010');
  });

  it('Should throw an error if entity created with wrong value', () => {
    const t = () => PhoneNumber.create('wrong');
    expect(t).toThrow(Error);
  });
});
