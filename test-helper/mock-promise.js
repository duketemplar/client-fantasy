/*
 * You can use these test helper to avoid async testing of promises
 */
 export function createSuccessPromise(value) {
   return {
     then: (cb) => createSuccessPromise(cb(value)),
     catch: () => {},
     value,
   };
 }

 export function createFailPromise(value) {
   return {
     then: (success, fail) => createFailPromise(fail ? fail(value) : value),
     catch: (fail) => createFailPromise(fail(value)),
     value,
   };
 }
