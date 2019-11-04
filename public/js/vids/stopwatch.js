// /**
//  * jQuery Stopwatch
//  * by @websightdesigns
//  *
//  * Based on "Javascript Stopwatch" by Daniel Hug
//  * From http://jsfiddle.net/Daniel_Hug/pvk6p/
//  * Modified to:
//  * - add responsive css styles
//  * - add save functionality with cookies
//  */
// // Initialize our variables
// var timerDiv = document.getElementById('timerValue'),
// 	start = document.getElementById('watchstart'),
// 	stop = document.getElementById('stop'),
// 	reset = document.getElementById('reset'),
// 	t;
// 
// // Get time from cookie
// var cookieTime = getCookie('time');
// 
// // If timer value is saved in the cookie
// if( cookieTime != null && cookieTime != '00:00:00' ) {
// 	var savedCookie = cookieTime;
// 	var initialSegments = savedCookie.split('|');
// 	var savedTimer = initialSegments[0];
// 	var timerSegments = savedTimer.split(':');
// 	var seconds = parseInt(timerSegments[2]),
// 		minutes = parseInt(timerSegments[1]),
// 		hours = parseInt(timerSegments[0]);
// 	timer();
// 	document.getElementById('timerValue').textContent = savedTimer;
// 	$('#stop').removeAttr('disabled');
// 	$('#reset').removeAttr('disabled');
// } else {
// 	var seconds = 0, minutes = 0, hours = 0;
// 	timerDiv.textContent = "00:00:00";
// }
// 
// // New Date object for the expire time
// var curdate = new Date();
// var exp = new Date();
// 
// // Set the expire time
// exp.setTime(exp + 2592000000);
// 
// function add() {
// 
// 	seconds++;
// 	if (seconds >= 60) {
// 		seconds = 0;
// 		minutes++;
// 		if (minutes >= 60) {
// 			minutes = 0;
// 			hours++;
// 		}
// 	}
// 
// 	timerDiv.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
// 		+ ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
// 		+ ":" + (seconds > 9 ? seconds : "0" + seconds);
// 
// 	// Set a 'time' cookie with the current timer time and expire time object.
// 	var timerTime = timerDiv.textContent.replace("%3A", ":");
// 	// console.log('timerTime', timerTime);
// 	setCookie('time', timerTime + '|' + curdate, exp);
// 
// 	timer();
// }
// 
// function timer() {
// 	t = setTimeout(add, 1000);
// }
// 
// // timer(); // autostart timer
// 
// /* Start button */
// start.onclick = timer;
// 
// /* Stop button */
// stop.onclick = function() {
// 	clearTimeout(t);
// }
// 
// /* Clear button */
// reset.onclick = function() {
// 	timerDiv.textContent = "00:00:00";
// 	seconds = 0; minutes = 0; hours = 0;
// 	setCookie('time', "00:00:00", exp);
// }
// 
// /**
//  * Javascript Stopwatch: Button Functionality
//  * by @websightdesigns
//  */
// 
// $('#watchstart').on('click', function() {
// 	$('#stop').removeAttr('disabled');
// 	$('#reset').removeAttr('disabled');
// });
// 
// $('#stop').on('click', function() {
// 	$(this).prop('disabled', 'disabled');
// });
// 
// $('#reset').on('click', function() {
// 	$(this).prop('disabled', 'disabled');
// });
// 
// /**
//  * Javascript Stopwatch: Cookie Functionality
//  * by @websightdesigns
//  */
// 
// function setCookie(name, value, expires) {
// 	document.cookie = name + "=" + value + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
// }
// 
// function getCookie(name) {
// 	var cname = name + "=";
// 	var dc = document.cookie;
// 
// 	if (dc.length > 0) {
// 		begin = dc.indexOf(cname);
// 		if (begin != -1) {
// 		begin += cname.length;
// 		end = dc.indexOf(";", begin);
// 			if (end == -1) end = dc.length;
// 			return unescape(dc.substring(begin, end));
// 		}
// 	}
// 	return null;
// }
// /**
//  * TODO: Continue timing the timer while away...
//  */
