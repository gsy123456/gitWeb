window.onload=function(){
	var btn=document.getElementById("btn");
	btn.addEventListener("click",function(){
		//1
		// document.body.scrollTop=document.documentElement.scrollTop=0;
		//2
		// scrollTo(0,0);
		//3
		// var top=document.body.scrollTop|| document.documentElement.scrollTop;
		// scrollBy(0,-top);
		//4
		var top=document.getElementById("top");
		top.scrollIntoView();
	},false);
}