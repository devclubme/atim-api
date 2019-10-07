export function success(body) {
  return buildResponse(200, body);
}

export function accepted(body){
  return buildResponse(202, body);
}

export function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body, headers) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Cache-Control": "no-cache",
      ...headers
    },
    body: JSON.stringify(body)
  };
}
