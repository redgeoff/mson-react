import utils from './utils';

it('should convert to snake case', () => {
  expect(utils.snakeCase('Foo Bar')).toEqual('foo_bar');
  expect(utils.snakeCase('fooBar')).toEqual('foo_bar');
  expect(utils.snakeCase('FooBar')).toEqual('foo_bar');
  expect(utils.snakeCase('Foo   Bar')).toEqual('foo_bar');
});
