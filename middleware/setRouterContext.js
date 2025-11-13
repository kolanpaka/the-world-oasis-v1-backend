function setRouterContext(context) {
  return (req, res, next) => {
    req.routerContext = context;
    next();
  };
}

module.exports = setRouterContext;
