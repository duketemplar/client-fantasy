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
  const errorMessage = 'Some error message';

  beforeEach(() => {
    validSE = [
      ['SE', null],
      ['SE', undefined],
      ['SE', ''],
      ['', '+46707792456'], // defaults to SE
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
      ['SE', '0'],
      ['SE', '+44707792455'],
      ['DK', '+44707792455'],
    ];
    invalidFI = [
      ['FI', '355-010123-8221'],
      ['', '020 198 5898'], // defaults to SE
    ];
    invalidNO = [
      ['NO', '+5520376-49749'],
    ];
    invalidDK = [
      ['DK', '+55010123-011'],
    ];
  });

  it('should be a valid phone number', () => {
    [...validSE, ...validNO, ...validFI, ...validDK].forEach((data) => {
      expect(validatePhonenumber(errorMessage, data[1], data[0])).to.equal(null);
    });
  });

  it('Should be a falsy phone number', () => {
    [...invalidSE, ...invalidNO, ...invalidFI, ...invalidDK].forEach((data) => {
      expect(validatePhonenumber(errorMessage, data[1], data[0])).to.equal(errorMessage);
    });
  });
});
