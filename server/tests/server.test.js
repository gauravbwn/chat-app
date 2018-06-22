var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./../utility/message');

describe('generateMessage', () => {
  it('should generate correct message', () => {
    var text = "a test message";
    var from = "test agent";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from = "test agent";
    var lat = 24;
    var lng = 90;
    var message = generateLocationMessage(from, lat, lng);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('url', `https://www.google.com/maps?q=${lat},${lng}`);
  });
});
