function fir(number){
 return "2+2 = " + number;
}
function sec(number){
 return "3+4 = " + number;
}
function isBalanced(s){
 var Stack = require('stack-lifo');
	var stack = new Stack();
	for(int i=0;i<s.size();i++){
	        if(s[i]=='(' )
	            stack.push(')');
	        if(s[i]=='[')
	            stack.push(']');
	        if(s[i]=='{')
	            stack.push('}');
	        
	        if(s[i]=='}' || s[i]==')' || s[i]==']'){
	            if(stack.top()==s[i])
	                stack.pop();
	        }
	    }
	    if(stack.empty())
	        return "yes";
	    else
	        return "-1";
}
module.exports = {
 first:fir,
 sec:sec,
	third:isBalanced
}
