// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
	startWatch();
}

// Start watching the acceleration
function startWatch() {
	// Update acceleration every 500ms
	var options = { frequency: 500 };

	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the acceleration
function stopWatch() {
	if (watchID) {
		navigator.accelerometer.clearWatch(watchID);
		watchID = null;
	}
}

// onSuccess: Get a snapshot of the current acceleration
var dx = 0.0, dy = 0.0, dz = 0.0, dg = 0.0;
var vx = 0.0, vy = 0.0, vz = 0.0, vg = 0.0;
var dl = 0.0, dg = 0.0, d_tot = 0.0;
var dt = 0.500, dt_tot = 0.0;
var ag = 9.7, prev_ax = 0.0, prev_ay = 0.0, prev_az = 0.0;
var tot = 0.0;
function onSuccess(acceleration) 
{
	//Phone Displacement in X, Y, and Z Plain
	vx = vx + (prev_ax + acceleration.x)/2.0*dt;
	dx = dx + vx*dt;
	vy = vy + (prev_ay + acceleration.y)/2.0*dt;
	dy = dy + vy*dt;
	vz = vz + (prev_az + acceleration.z)/2.0*dt;
	dz = dz + vz*dt;
	
	//Displacement due to Gravity
	vg = vg + (ag + ag)/2.0*dt;
	dg = dg + vg*dt;

	//alert("(vx,vy,vz) ("+vx+", "+vy+", "+vz+", "+")")
	//alert("(dx,dy,dz) ("+dx+", "+dy+", "+dz+", "+")")
	
	dl = Math.sqrt(dx*dx + dy*dy + dz*dz);
	d_tot = dl - dg; //Remove effects of gravity
	
	//alert("dl, dg " + dl + ', ' + dg);
	
	prev_ax = acceleration.x;
	prev_ay = acceleration.y;
	prev_az = acceleration.z;
	dt_tot = dt_tot + dt;

	//10s 490.50m
	
	var accelement = document.getElementById('accelerometer');
	accelement.innerHTML = '(X, Y, Z) (' + acceleration.x.toFixed(1) + ', ' + acceleration.y.toFixed(4) + ', ' + acceleration.z.toFixed(1) + ') <br/> (Time, Distance) (' + dt_tot.toFixed(1) + ", " + d_tot.toFixed(2) +')';
}

// onError: Failed to get the acceleration
function onError() {
	alert('onError!');
}