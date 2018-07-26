var $ = function (id) {
    return document.getElementById(id); 
};

var CalculateFuture = function(){
	var pv = parseFloat($("PV").value);
	var r = parseFloat($("R").value);
	var n = parseFloat($("N").value);
	
	if(isNaN(pv)|| isNaN(r) || isNaN(n))
		alert("These values must be numbers");
	else{
	r = r/100;
	n = n;
	var fv = ((pv)*((Math.pow((1+r),n))-1))/r
	$("FV").value = (fv).toFixed(2);
	var total = 0;
	var tempD = pv;
		var res = "<table border='1'><tr><th>Year</th><th>Disbursement</th><th>Running Total</th>";
		for(var i=1; i<=(n); i++){
			total = (total + (tempD+(tempD)*((i-1)*r)));
			res+="<tr><td>"+(i-1)+"</td><td>&euro;"+(tempD+(tempD)*((i-1)*r)).toFixed(2)+"</td><td>&euro;"+(total).toFixed(2);
		}
		res+="</table>";
		$("results").innerHTML = res;

	}
};
var CalculatePresent = function(){
	var fv = parseFloat($("FV").value);
	var r = parseFloat($("R").value);
	var n = parseFloat($("N").value);
	
	if(isNaN(fv)|| isNaN(r) || isNaN(n))
		alert("These values must be numbers");
	else{
		r = r/100;
		n = n*1;
		var pv = ((fv)*(r)) / ((Math.pow((1+r),n))-1);
		$("PV").value = (pv).toFixed(2);
		total = 0;
		var res = "<table border='1'><tr><th>Year</th><th>FV</th><th>Running Total</th>";
		for(var i=1; i<=(n); i++){
			total = (total + (pv+(pv)*((i-1)*r)));
			res+="<tr><td>"+(i-1)+"</td><td>&euro;"+(pv+(pv)*((i-1)*r)).toFixed(2)+"</td><td>&euro;"+(total).toFixed(2);
		}
		res+="</table>";
		$("results").innerHTML = res;
	}
};

var calculate = function(){
	if($("Future").checked) 
		CalculateFuture();
	if($("Present").checked) 
		CalculatePresent();
};

var CheckSelection = function(id){
	if(id==1){
		 $("FV").disabled = true;
		 $("PV").disabled = false;
		 $("R").disabled = false;
		 $("N").disabled = false;
	}
	else if(id==2){
		 $("PV").disabled = true;
		 $("FV").disabled = false;
		 $("R").disabled = false;
		 $("N").disabled = false;
	}
	
};
var RESET = function () {
    $("FV").value="";
    $("PV").value="";
    $("R").value="";
    $("N").value="";
	$("results").innerHTML = "";
};
window.onload = function () {
	$("calculate").onclick = calculate;
    $("reset").onclick = RESET;
};