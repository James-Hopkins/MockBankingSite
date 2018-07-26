var $ = function (id) {
    return document.getElementById(id); 
};

var FutureValue = function(){
	var pv = parseFloat($("PV").value);
	var r = parseFloat($("ROF").value);
	var n = parseFloat($("Year").value);
	
	if(isNaN(pv)|| isNaN(r) || isNaN(n))
		alert("These values must be numbers");
	else{
		r = r/100/Compounded();
		n = n*Compounded();
		$("FV").value=(pv*Math.pow((1+r), n)).toFixed(2);
		
		var res = "<table border='1'><tr><th>Period</th><th>Investment</th><th>Year End</th></tr>";
		for(var i=1; i<=n; i++){
			res+="<tr><td>"+i+"</td><td>&euro;"+(pv).toFixed(2)+"</td><td>&euro;"+(pv*Math.pow((1+r), 1)).toFixed(2)+"</td></tr>";
			pv = pv*Math.pow((1+r), 1);
		}
		res+="</table>";
		$("results").innerHTML = res;
	}
};
var PresentValue = function(){
	var fv = parseFloat($("FV").value);
	var r = parseFloat($("ROF").value);
	var n = parseFloat($("Year").value);
	
	if(isNaN(fv)|| isNaN(r) || isNaN(n))
		alert("These values must be numbers");
	else{
		r = r/100/Compounded();
		n = n*Compounded();
		$("PV").value=(fv/Math.pow((1+r), n)).toFixed(2);
	}
};
var RateOfInterest = function(){
	var fv = parseFloat($("FV").value);
	var pv = parseFloat($("PV").value);
	var n = parseFloat($("Year").value);
	
	if(isNaN(fv)|| isNaN(pv) || isNaN(n))
		alert("These values must be numbers");
	else{
		n = n*Compounded();
		$("ROF").value= ((Math.pow((fv/pv),(1/n))-1)*100*Compounded()).toFixed(2)+"%";
	}
};
var NoOfYears = function(){
	var fv = parseFloat($("FV").value);
	var pv = parseFloat($("PV").value);
	var r = parseFloat($("ROF").value);
	
	if(isNaN(fv)|| isNaN(pv) || isNaN(r))
		alert("These values must be numbers");
	else{
		r = r/100/Compounded();
		$("Year").value= (((Math.log(fv)-Math.log(pv))/Math.log(1+r))/Compounded()).toFixed(2);
	}
};
var Compounded = function(){ 
	var com = $("compounded").value;
	if(com=="year")
		return 1;
	if(com=="quarter")
		return 4;
	if(com=="month")
		return 12;
};
var calculate = function(){
	if($("FutVal").checked) 
		FutureValue();
	if($("PreVal").checked) 
		PresentValue();
	if($("Rate").checked) 
		RateOfInterest();	
	if($("NoYears").checked) 
		NoOfYears();
};

var CheckSelection = function(id){
	if(id==1){
		 $("FV").disabled = true;
		 $("PV").disabled = false;
		 $("ROF").disabled = false;
		 $("Year").disabled = false;
	}
	else if(id==2){
		 $("PV").disabled = true;
		 $("FV").disabled = false;
		 $("ROF").disabled = false;
		 $("Year").disabled = false;
	}
	else if(id==3){
		 $("PV").disabled = false;
		 $("FV").disabled = false;
		 $("ROF").disabled = true;
		 $("Year").disabled = false;
	}
	else{
		 $("PV").disabled = false;
		 $("FV").disabled = false;
		 $("ROF").disabled = false;
		 $("Year").disabled = true;
	}
	//RESET();
};
var RESET = function () {
    $("FV").value="";
    $("PV").value="";
    $("ROF").value="";
    $("Year").value="";
	$("results").innerHTML = "";
};
window.onload = function () {
	$("calculate").onclick = calculate;
    $("reset").onclick = RESET;
};