var d = { x: 1, y: 0},			// player position
k = [],							// key map
j = 0,							// jump
J = 0,							// double jump counter
c = 0,							// camera
e = [ 							// enemies
	{ x: 51, y: 23 },
	{ x: 121, y: 23 },
	{ x: 141, y: 12 }
];

// platforms
var P = [
	[ 0 ], // 0
	[ 0 ], // 1
	[ 0, 1, 2, 3, 4, 5 ], // 2
	[ 0 ], // 3
	[ 0, 6, 7, 8, 9, 10, 11 ], // 4
	[ 0 ], // 5
	[ 0 ], // 6
	[ 0, 14, 15, 16, 17, 18 ], // 7
	[ 0 ], // 8
	[ 0 ], // 9
	[ 0, 25, 26, 27, 105, 106, 107, 108, 109, 110, 120, 121, 122, 123, 124, 125 ], // 10
	[ 0 ], // 11
	[ 0, 140, 160 ], // 12
	[ 0, 99, 100, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160 ], // 13
	[ 0, 99 ], // 14
	[ 0, 99 ], // 15
	[ 0, 99 ], // 16
	[ 0, 99 ], // 17
	[ 0, 99 ], // 18
	[ 0, 99, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90 ], // 19
	[ 0, 99 ], // 20
	[ 0, 99 ], // 21
	[ 0, 99 ], // 22
	[ 0, 28, 29, 30, 50, 99, 120, 170 ], // 23
	[  ] // 24
];

// floor
for(var i=0; i <= 350; i++) {
	if(i > 39 && i < 50 || i > 100 && i < 120) continue; // holes

	P[24][i] = i;
}

var X = setInterval(function(indexOf, o, E, l, i, y, m) {
	o = "";
	indexOf = "indexOf";

	// move
	k[39] && !~P[d.y][indexOf](d.x+1) ? d.x++ && C(1) : k[37] && !~P[d.y][indexOf](d.x-1) && d.x-- && C(-1);

	// enemy movement
	for(i=0; i < e.length; i++) {
		E = e[i];
		~P[E.y][indexOf](E.x+1) ? E.a = 0 : ~P[E.y][indexOf](E.x-1) && (E.a = 1);
		E.x = E.a ? E.x+.5 : E.x-.5;
	}


	// check death
	(d.y == 24 || d.x == E.x && d.y == E.y) && clearInterval(X);

	// jumping
	if(j) {
		d.y -= j;
		j++;

		// limit jump
		d.y < 0 && (d.y = 0);

		// end jump
		j = j > 4 ? 0 : j
	}

	for(y = 0; y < P.length; y++) {
		for(i = c; i < c + 100; i++) {
			// enemies
			m = 1;
			for(l=0; l < e.length; l++) {
				E = e[l];
				if(E.x == i && E.y == y) {
					// check death
					if(E.x == d.x && E.y == d.y) clearInterval(X);

					o += E.a == 1 ? "c" : "ↄ";
					m = 0;
					break
				}
			}

			m && (
				o += d.x == i && d.y == y ? "▄"		// player block
					: ~P[y][indexOf](i) ? "-"		// platform block
					: " ");							// world block
		}
		o += "\n";
	}

	// platform detection || reset double jump
	P[d.y+1] && !~P[d.y+1][indexOf](d.x) && d.y++ || (J = 0);

	// output
	p.innerHTML = o;
}, 50);

function C(add) {
	c = d.x < 26 ? 0 : c+add;
}

// key events
onkeydown = onkeyup = function(e, x) {
	// move
	if(e[x="keyCode"] == 37 || e[x] == 39)
		k[e[x]] = e.type == 'keydown';

	// jump
	if(e.type == 'keydown' && e[x] == 38 && !j && J < 2) {
		j = 1; J++;
	}
};