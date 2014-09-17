var connect = require('connect');
var login = require('./login');

var app = connect();

app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

function main(request, response, next) 
{

	switch (request.method) 
	{
		case 'GET': get(request, response); break;
		case 'POST': post(request, response); break;
		case 'DELETE': del(request, response); break;
		case 'PUT': put(request, response); break;
	}
	
};

function get(request, response) 
{
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) 
	{
		var sid = cookies['session_id'];
		if ( login.isLoggedIn(sid) ) 
		{
			response.setHeader('Set-Cookie', 'session_id=' + sid);
			response.end(login.hello(sid));	
		} 
		else 
		{
			response.end("Session with mentioned Session ID, is not present anymore !\n");
		}
	} 
	else 
	{
		response.end("Please login via HTTP POST\n");
	}
};

function post(request, response) 
{
	
	// TODO: read 'name and email from the request.body'
	var name = request.body.name;
	var email = request.body.email;
	
	// TODO: set new session id to the 'session_id' cookie in the response
	// replace "Logged In" response with response.end(login.hello(newSessionId));
	var newSessionId = login.login(name, email);
	response.setHeader('Set-Cookie', 'session_id=' + newSessionId);
	response.end(login.hello(newSessionId));
};

function del(request, response) 
{
	var delSession = request.cookies;
	if ('session_id' in delSession) 
	{
		var sid = delSession['session_id'];
		if ( login.isLoggedIn(sid) ) 
		{

			console.log("DELETE:: Logout from the server");
 			var invokeLogout = request.cookies;
 			var logoutSessionID = invokeLogout['session_id']
	
 			// TODO: remove session id via login.logout(xxx)
 			// No need to set session id in the response cookies since you just logged out!
 			login.logout(logoutSessionID);
 			console.log(logoutSessionID);
 			response.end('Logged out from the server ! \n \n');
 		}
 		else 
		{
			response.end("Session with mentioned Session ID, is not present !\n");
		}
	} 
	else 
	{
		response.end("Please login via HTTP POST\n");
	}
 
};

function put(request, response) 
{
	
	// TODO: refresh session id; similar to the post() function

	console.log("PUT:: Re-generate new seesion_id for the same user");
	var putSession = request.cookies;
	    
   if ('session_id' in putSession) 
	{
		var sid = putSession['session_id'];
		if ( login.isLoggedIn(sid) ) 
		{
			var sendToReplace=putSession['session_id']
    		var putNewSid = login.replacelogin(sendToReplace);
    		
    		response.setHeader('Set-Cookie', 'session_id=' + putNewSid);
			
    		response.end("Re-freshed session id\n");
		} 
		else 
		{
			response.end("Session with mentioned Session ID, is not present anymore !\n");
			
		}
	} 
	else 
	{
	
		response.end("Please login via HTTP POST\n");
	}

}

app.listen(8000);

console.log("Node.JS server running at 8000...");
