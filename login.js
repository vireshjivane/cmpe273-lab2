
/**
 * Login Class
 */
function Login() {
	// sessionId -> user map
	this.sessionMap = {
		99999 : { name: 'Foo', email: 'foo@bar.com' }
	};
}
/**
 * Say Hello {name} to the user
 */
Login.prototype.hello = function(sessionId) {
	return 'Hello ' + this.sessionMap[sessionId].name + '\n';
};

/**
 * Check whether the given session id is valid (is in sessionMap) or not.
 */
Login.prototype.isLoggedIn = function(sessionId) {
	return sessionId in this.sessionMap;
};

/**
 * Create a new session id for the given user.
 */
Login.prototype.login = function(_name, _email) {
   /*
	* Generate unique session id and set it into sessionMap like foo@bar.com
	*/
	var sessionId = new Date().getTime();
	this.sessionMap[sessionId] = { name: _name, email: _email } 
	
	console.log('new session id ' + sessionId + ' for login:: ' + _email + '  name:: ' + _name);
	
	return sessionId;
};


Login.prototype.replacelogin = function(_putSid) {
   /*
	* Similar to login, function to create new session ID and copy values of existing session.
	* Delete existing session to ensure that only, "Refreshed" session remains active.
	*/
	
	var newSessionId = new Date().getTime();
	console.log("Below is _putSid ");
	console.log(_putSid);
	console.log("Below is new id ");
	console.log(newSessionId);
	//this.sessionMap[newSessionId] = { name: this.sessionMap[_putSid].name, email: this.sessionMap[_putSid].email } 
	this.sessionMap[newSessionId] = this.sessionMap[_putSid];
    delete(this.sessionMap[_putSid]);
    //this.sessionMap[_putSid]=null;
	//this.sessionMap[newSessionId].name = this.sessionMap[_putSid].name;
	//this.sessionMap[newSessionId].email = this.sessionMap[_putSid].email;

	console.log('new session id ' + newSessionId + ' for login:: ' + this.sessionMap[newSessionId].email + '  name:: ' + this.sessionMap[newSessionId].name);
	//{ name: _name, email: _email } 
	
	//console.log('new session id ' + newSessionId + ' for login:: ' + _email + '  name:: ' + _name);
	
	return newSessionId;
};

/**
 * Logout from the server
 */ 
Login.prototype.logout = function(sessionId) {
	console.log('logout::' + sessionId);
 
	//response.setHeader('Set-Cookie', 'session_id=' + null);
	//this.sessionMap[sessionId]=null;
	//this.sessionMap[sessionId] = {null : {}};

   /*
	* TODO: Remove the given sessionId from the sessionMap
	*/
	delete(this.sessionMap[sessionId]);

};

// Export the Login class
module.exports = new Login();
