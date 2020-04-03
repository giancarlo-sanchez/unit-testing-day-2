function getBodyFromRequest(req) {
  let data = '';
  return new Promise(resolve => {
    req.on('data', chunk => {  // emit contentOfBody where 'data' is set on request
      data += chunk;
    });
    req.on('end', () => {     //emit "end" on request
      resolve(data);
    });
  });
}

exports.getBodyFromRequest = getBodyFromRequest;
