var $ = function (id) {
    return document.getElementById(id); 
};

var CalculateDept = function(){
	var m = parseFloat($("M").value);
	var r = parseFloat($("R").value);
	var n = parseFloat($("N").value);
	
	if(isNaN(m)|| isNaN(r) || isNaN(n))
		alert("These values must be numbers");
	else{
	r = r/12/100;
	n = n*12;
	var p = ((m)*(1-(1/(Math.pow((1+r),n)))))/r
	$("P").value = (p).toFixed(2);
	
	var tempD = m;
		var res = "<table border='1'><tr><th>Month</th><th>Starting Balance</th><th>Interest Due</th><th>Capital Repaid</th></tr>";
		for(var i=1; i<=(n+1); i++){
			res+="<tr><td>"+i+"</td><td>&euro;"+((p)).toFixed(2)+"</td><td>&euro;"+(p*r).toFixed(2)+"</td><td>&euro;"+(tempD-((p*r))).toFixed(2)+"</td></tr>";
			p = (p-(tempD-((p*r))));
		}
		res+="</table>";
		$("results").innerHTML = res;

	}
};
var CalculateRepay = function(){
	var p = parseFloat($("P").value);
	var r = parseFloat($("R").value);
	var n = parseFloat($("N").value);
	
	if(isNaN(p)|| isNaN(r) || isNaN(n))
		alert("These values must be numbers");
	else{
		r = r/12/100;
		n = n*12;
		var m = (p*r)/(1-1/(Math.pow((1+r),n)));
		$("M").value = (m).toFixed(2);
		var tempD = p;
		var res = "<table border='1'><tr><th>Month</th><th>Starting Balance</th><th>Interest Due</th><th>Capital Repaid</th></tr>";
		for(var i=1; i<=(n+1); i++){
			res+="<tr><td>"+i+"</td><td>&euro;"+(tempD).toFixed(2)+"</td><td>&euro;"+(tempD*r).toFixed(2)+"</td><td>&euro;"+(m-((tempD*r))).toFixed(2)+"</td></tr>";
			tempD = (tempD-(m-((tempD*r))));
		}
		res+="</table>";
		$("results").innerHTML = res;
	}
};

var calculate = function(){
	if($("Dept").checked) 
		CalculateDept();
	if($("Repay").checked) 
		CalculateRepay();
};

var CheckSelection = function(id){
	if(id==1){
		 $("P").disabled = true;
		 $("M").disabled = false;
		 $("R").disabled = false;
		 $("N").disabled = false;
	}
	else if(id==2){
		 $("M").disabled = true;
		 $("P").disabled = false;
		 $("R").disabled = false;
		 $("N").disabled = false;
	}
	RESET();
};
var RESET = function () {
    $("P").value="";
    $("M").value="";
    $("R").value="";
    $("N").value="";
	$("results").innerHTML = "";
};
window.onload = function () {
	$("calculate").onclick = calculate;
    $("reset").onclick = RESET;
};