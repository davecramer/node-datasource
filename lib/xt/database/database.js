
/** @namespace
  This is the primary namespace for the database driver and
  functionality of the framework.
*/

xt.database = xt.object.create(
  /** @lends xt.database.prototype */ {

  /**
    ...
  */
  conString: function() {
    var a = args(),
        s = 'tcp://{user}:{password}@{host}:{port}/{database}',
        u, p, P, h, d; 
    if(a[0] && xt.typeOf(a[0]) === xt.t_hash) {
      var a = a[0];
      u = a.user;
      p = a.password;
      P = a.port;
      h = a.host;
      d = a.database;
    }
    else {
      u = a[0];
      p = a[1];
      h = a[2];
      P = a[3];
      d = a[4];
    }
    return s.f({
      user: u,
      password: p,
      host: h,
      port: P,
      database: d
    });
  },

  defaultString: function() {
    var s = this._defaultString;
    if(xt.none(s))
      s = this._defaultString = this.conString(xt.opts);
    return s;
  }.property(),

  /**
    ...
  */
  query: function() {
    var a = arguments;
    if(
      a.length != 2
      || xt.typeOf(a[0]) !== xt.t_string
      || xt.typeOf(a[1]) !== xt.t_function
    ) return;
    var q = a[0],
        f = a[1],
        s = a[2] ? this.conString(a[2]) : this.get("defaultString");
    xt.pg.connect(s, function(e, c) {
      if(e) throw xt.fatal("Failed to connect to database", e);
      c.query(q, f);
    });
  }

});

xt.db = xt.database;

/** xt.database.check */  require('./check');