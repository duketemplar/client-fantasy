import { formatPhoneNumber } from '../phone-number-formatter';
import { expect } from 'chai';

describe.only('Phone number formatter', () => {
  let validSE;
  let inValidSE;
  beforeEach(() => {
    validSE = [
      ['SE', '+46707792456', '+46 70 779 24 56'],
      ['SE', '0707792456', '+46 70 779 24 56'],
      ['SE', '707792456', '+46 70 779 24 56'],
    ];

    inValidSE = [
      ['SE', '+46 70 779 2456', '+46 70 779 2456'],
      ['SE', '70 779 2456', '70 779 24 56'],
    ];
  });

  it('has a valid phone number format', () => {
    [...validSE].forEach((phoneDetails) => {
      expect(formatPhoneNumber(phoneDetails[1], phoneDetails[0])).to.equal(phoneDetails[2]);
    });
  });
  it('Is an invalid number format', () => {
    [...inValidSE].forEach((phoneDetails) => {
      expect(formatPhoneNumber(phoneDetails[1], phoneDetails[0])).to.not.equal(phoneDetails[2]);
    });
  });
});
