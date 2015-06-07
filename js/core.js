var k = [],		// key map
j = J = c = 0,	// jump, double jump counter, camera
_ = setInterval(function(indexOf, o, E, l, i, y, m) {
	o = "";
	indexOf = "indexOf";

	// move player / platform x-detection / camera scrolling
	k[39] && !~P[d.y][indexOf](d.x+1) ? d.x++ && (c = d.x < 26 ? 0 : c+1) : k[37] && !~P[d.y][indexOf](d.x-1) && d.x-- && (c = d.x < 26 ? 0 : c-1);

	// check death
	d.y > 24 && clearInterval(_);

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

				// enemy movement
				if(i == c && !y) {
					~P[E.y][indexOf](E.x + 1) ? E.a = 0 : ~P[E.y][indexOf](E.x - 1) && (E.a = 1);
					E.x = E.a ? E.x + 1 : E.x - 1
				}

				if(E.x == i && E.y == y) {
					// check death
					if(E.x == d.x && E.y == d.y) clearInterval(_);

					// draw enemy
					o += "<i>▄</i>";
					m = 0;
					break
				}
			}

			// goal
			if(G.x == d.x && G.y == d.y) clearInterval(_);

			// draw world
			m && (
				o += d.x == i && d.y == y ? "<b>▄</b>"	// player block
					: G.x == i && G.y == y ? "<u>▄</u>"	// goal block
					: ~P[y][indexOf](i) ? "▄"			// platform block
					: " "								// world block
			);
		}
		o += "\n";
	}

	// player falling detection || reset double jump
	P[d.y+1] && !~P[d.y+1][indexOf](d.x) && d.y++ || (J = 0);

	// output
	p.innerHTML = o;
}, 50);

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