import { validatePhonenumber } from '../phone-number-validator';
import { expect } from 'chai';

describe('Validate phone number', () => {
  let validSE;
  let invalidSE;
  let validNO;
  let validFI;
  let validDK;

  let invalidNO;
  let invalidFI;
  let invalidDK;

  beforeEach(() => {
    validSE = [
      ['SE', '+46707792456'],
      ['SE', '46707792456'],
      ['SE', '707792456'],
      ['SE', '0707792456'],
    ];
    validNO = [
      ['NO', '23 33 30 23'],
    ];
    validFI = [
      ['FI', '020 198 5898'],
    ];
    validDK = [
      ['DK', '70 20 66 85'],
    ];

    invalidSE = [
      ['SE', '+44707792455'],
      ['DK', '+44707792455'],
    ];
    invalidFI = [
      ['FI', '355-010123-8221'],
    ];
    invalidNO = [
      ['NO', '+5520376-49749'],
    ];
    invalidDK = [
      ['DK', '+55010123-011'],
    ];
  });

  it('should be a valid phone number', () => {
    [...validSE, ...validNO, ...validFI, ...validDK].forEach((number) => {
      expect(validatePhonenumber(number[1], number[0])).to.equal(true);
    });
  });

  it('Should be a falsy phone number', () => {
    [...invalidSE, ...invalidNO, ...invalidFI, ...invalidDK].forEach((number) => {
      expect(validatePhonenumber(number[1], number[0])).to.equal(false);
    });
  });
});
