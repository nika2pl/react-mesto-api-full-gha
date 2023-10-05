const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const URL_MONGO = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;
const { JWT_SECRET = 'some-secret-key' } = process.env;

module.exports.URL_REGEX = URL_REGEX;
module.exports.JWT_SECRET = JWT_SECRET;
module.exports.URL_MONGO = URL_MONGO;
module.exports.PORT = PORT;
