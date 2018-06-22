var expect = require('expect');

var {generateMessage} = require('./../utility/message');

describe('', () => {
  it('should generate correct message', () => {
    var text = "a test message";
    var from = "test agent";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
  });
});
