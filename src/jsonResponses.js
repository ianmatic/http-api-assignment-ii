// Function that sends the respons object back to the client
const respondObj = (request, response, status, object, type) => {
    let responseObj;
    let responseType;
  
    // Build XML/JSON objects
    if (type[0] === 'text/xml') {
      responseObj = '<response>';
      responseObj = `${responseObj} <message>${object.message}</message>`;
      responseObj = `${responseObj} <id>${object.id}</id>`;
      responseObj = `${responseObj} </response>`;
  
      responseType = 'text/xml';
    } else {
      responseObj = JSON.stringify(object);
  
      responseType = 'application/json';
    }
  
    // Send back response object of appropriate type to client
    response.writeHead(status, { 'Content-Type': responseType });
    response.write(responseObj);
    response.end();
  };
  
  // 200 - Success
  const success = (request, response, type) => {
    const responseJSON = {
      message: 'This is a successful response.',
    };
    respondObj(request, response, 200, responseJSON, type);
  };
  
  // 400 - Bad Request
  const badRequest = (request, response, type, params) => {
    const responseJSON = {
      message: 'This request has the required parameters.',
    };
  
    // Check '?valid=true' param
    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true.';
      responseJSON.id = 'badRequest';
  
      respondObj(request, response, 400, responseJSON, type);
    } else {
      respondObj(request, response, 200, responseJSON, type);
    }
  };
  
  // 401 - Unauthorized
  const unauthorized = (request, response, type, params) => {
    const responseJSON = {
      message: 'You have successfully viewed the content.',
    };
  
    // Check '?loggedIn=yes' param
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseJSON.message = 'Missing loggedIn query parameter set to yes.';
      responseJSON.id = 'unauthorized';
  
      return respondObj(request, response, 401, responseJSON, type);
    }
    return respondObj(request, response, 200, responseJSON, type);
  };
  
  // 403 - Forbidden
  const forbidden = (request, response, type) => {
    const responseJSON = {
      message: 'You do not have access to this content.',
      id: 'forbidden',
    };
  
    respondObj(request, response, 403, responseJSON, type);
  };
  
  // 500 - Internal
  const internal = (request, response, type) => {
    const responseJSON = {
      message: 'Interal Server Error. Something went wrong.',
      id: 'internalError',
    };
  
    respondObj(request, response, 500, responseJSON, type);
  };
  
  // 501 - Not Implemented
  const notImplemented = (request, response, type) => {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };
  
    respondObj(request, response, 501, responseJSON, type);
  };
  
  // 404 - Not Found
  const notFound = (request, response, type) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
  
    respondObj(request, response, 404, responseJSON, type);
  };
  
  
  module.exports = {
    success, // 200
    badRequest, // 400
    unauthorized, // 401
    forbidden, // 403
    internal, // 500
    notImplemented, // 501
    notFound, // 404
  };