var previewHelpers = {};

previewHelpers.getContentTypeBrush = function (contentType) {
  if ((contentType != null ? contentType.slice(-5) : void 0) === '+json') {
    return 'language-javascript';
  }
  if ((contentType != null ? contentType.slice(-4) : void 0) === '+xml') {
    return 'language-markup';
  }
  switch (contentType) {
    case 'application/json':
      return 'language-javascript';
    case 'text/xml':
      return 'language-markup';
    case 'application/xml':
      return 'language-markup';
    default:
      return '';
  }
};

previewHelpers.getContentType = function (headers) {
  var key, val, results = [];
  if (!headers) {
    return void 0;
  }
  for (key in headers) {
    val = headers[key];
    if (key.toLowerCase() === 'content-type') {
      results.push(val);
    }
  }
  if (results.length > 0) {
    return results[0];
  }
  return void 0;
};

var helpers = {
  escapeLtExp: /</g,
  escapeGtExp: />/g,
  escapeAmpExp: /&/g,
  escape: function(str) {
    return JSON.stringify(str).replace(helpers.escapeLtExp, '\\u003C').replace(helpers.escapeGtExp, '\\u003E').replace(helpers.escapeAmpExp, '\\u0026');
  },
  rubyKey: function(str) {
    return str.replace(/\-/g, '_').toLowerCase();
  },
  getContentType: previewHelpers.getContentType,
  getContentTypeBrush: function(headers) {
    return previewHelpers.getContentTypeBrush(helpers.getContentType(headers));
  },
  isNotEmpty: function(obj) {
    var i;
    for (i in obj) {
      return true;
    }
    return false;
  }
};
