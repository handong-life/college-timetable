const { HTTP_STATUS } = require('../utils/constants');

exports.errorMiddleware = (err, req, res, next) => {
  // set locals, only providing error in development
  console.log(err);
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.message.includes('undefined')) err.status = HTTP_STATUS.BAD_REQUEST;

  res.status(err.status || HTTP_STATUS.SERVER_ERROR);
  res.send(err.message);
};
