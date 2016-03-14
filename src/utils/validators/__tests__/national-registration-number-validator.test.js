import nationalRegistrationNumberValidator from '../national-registration-number-validator';
import { assert } from 'chai';

describe("National registration number validator", () => {
  let validSE, validNO, validFI, validDK, invalidSE, invalidNO, invalidFI, invalidDK;

  beforeEach(() => {
    validSE = [
      ['se', '19220502-0064'],
      ['se', '192205020072'],
      ['se', '220502-0080'],
      ['se', '2205020098'],
    ];

    invalidSE = [
      ['se', '19220502-064321'],
      ['se', '19220502-0643!@#$'],
      ['se', '19220502-064'],
      ['se', '192220072'],
      ['se', '220502-000'],
      ['se', '2208'],
      ['se', 'asdfQWER'],
    ];

    validNO = [
      ['no', '120376-49749'],
      ['no', '12037649668'],
      ['no', '120376-49587'],
      ['no', '12037649315'],
    ];

    invalidNO = [
      ['no', '20376-49749'],
      ['no', '120376-4987'],
      ['no', '1203764915'],
      ['no', '120376-497491'],
      ['no', '120376496681'],
      ['no', '!120376-49587'],
      ['no', '12037649315@'],
    ];

    validFI = [
      ['fi', '010123-822W'],
      ['fi', '010123823X'],
      ['fi', '010123-8250'],
      ['fi', '0101238272'],
    ];

    invalidFI = [
      ['fi', '010123-822W1'],
      ['fi', '01012382'],
      ['fi', '010123-825!'],
      ['fi', '010123872'],
    ];

    validDK = [
      ['dk', '010123-0171'],
      ['dk', '010123-0201'],
      ['dk', '0101230228'],
      ['dk', '0101230252'],
    ];

    invalidDK = [
      ['dk', '010123-011'],
      ['dk', '0101230201'],
      ['dk', '010123-02128'],
      ['dk', '00123-0#52'],
    ];
  });

  it('validates accurate national registration numbers', () => {
    [ ...validSE, ...validFI, ...validDK, ...validNO ].forEach((natRegNo) => {
      assert.isNull(
        nationalRegistrationNumberValidator(natRegNo[0], 'Failed', natRegNo[1]),
        `Valid national registration number did not pass, nationality: ${natRegNo[0]} number: ${natRegNo[1]}`
      );
    });
  });

  it('does not validate invalid national registration numbers', () => {
    [ ...invalidSE, ...invalidNO  /*, ...invalidFI, ...invalidDK, */].forEach((natRegNo) => {
      const isValid = nationalRegistrationNumberValidator(natRegNo[0], 'Failed', natRegNo[1]);
      assert.isString(
        isValid,
        `Invalid national registration number did passed, nationality: ${natRegNo[0]} number: ${natRegNo[1]}`
      );
    });
  });

  it('validates empty values', () => {
    assert(nationalRegistrationNumberValidator('se', 'failed', '') === null, 'it failed to pass an empty value');
    assert(nationalRegistrationNumberValidator('dk', 'failed', '') === null, 'it failed to pass an empty value');
    assert(nationalRegistrationNumberValidator('fi', 'failed', '') === null, 'it failed to pass an empty value');
    assert(nationalRegistrationNumberValidator('no', 'failed', '') === null, 'it failed to pass an empty value');
    assert(nationalRegistrationNumberValidator('se', 'failed', null) === null, 'it failed to pass an empty value');
    assert(nationalRegistrationNumberValidator('dk', 'failed', undefined) === null, 'it failed to pass an empty value');
    assert(nationalRegistrationNumberValidator('fi', 'failed', undefined) === null, 'it failed to pass an empty value');
    assert(nationalRegistrationNumberValidator('no', 'failed', null) === null, 'it failed to pass an empty value');
  });

});