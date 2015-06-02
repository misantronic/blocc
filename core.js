var d = 1;	// player position
var k = [];	// key map
var j = 0;	// jump
var J = 0;	// double jump counter
var c = 0;
var P = [	// platforms / walls
		301, 302, 303, 304, 305, 306,
		507, 508, 509, 510, 511, 512,
		713, 714, 715, 716, 717, 718,
		1025, 1026, 1027,
		401, 501, 601, 701, 801, 901, 1001, 1101, 1201, 1301, 1401, 1501, 1601, 1701, 1801, 1901, 2001, 2101, 2201, 2301, 2401,
		2399, 2299, 2199, 2099, 1999, 1899, 1799, 1699,
		2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
		2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080,
		2328, 2329, 23330
	];
var e = 2302, E = 1; // enemy

for(var i=2401; i <= 2500; i++) {
	if(i == 2440 || i == 2441 || i == 2442 || i == 2470 || i == 2471 || i == 2472) continue; // holes

	P.push(i);
}

var x = setInterval(function(s, I) {
	s = "";
	I = "indexOf";

	// move
	k[39] && !~P[I](d+1) ? d++ : k[37] && !~P[I](d-1) && d--;

	// enemy movement
	~P[I](e+1) ? E=0 : ~P[I](e-1) && (E=1);
	e = E ? e+.5 : e-.5;

	// check death
	e == d && clearInterval(x);

	// jumping
	if(j) {
		d -= (100 * j);
		j++;

		if(j > 4 || ~P[I](d-100)) j = 0;
	}

	// draw world
	for(i = c; i < 2500; i++) {
		if(i == d) {		// player block
			s += "▄";
		} else if(i == e) {	// enemy block
			s += E ? "c" : "ↄ";
		} else if(~P[I](i)) {
			s += "-";		// platform block
		} else  {			// world block
			s += " ";
		}

		if(i % (c+100) == 0) {	// line breaks
			s += "\n";
		}
	}

	if(!~P[I](d+100)) {	// platform detection
		d += 100;
	} else {
		J = 0;			// reset double jump
	}

	// move camera


	// reset player position
	if(d > 2500) d = 1;

	// output
	p.innerHTML = s;
}, 50);

// key events
onkeydown = onkeyup = function(e) {
	// move
	if(e.keyCode == 37 || e.keyCode == 39)
		k[e.keyCode] = e.type == 'keydown';

	// jump
	if(e.type == 'keydown' && e.keyCode == 38 && !j && J < 2) {
		j = 1; J++;
	}
};