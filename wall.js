class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
    }

    draw() {
        noStroke();
        fill(64);
        rect(this.x, this.y, this.w, this.h);
    }

    static getBorderWalls(window_width, window_height, thickness) {
        // Assumes
        /*
		 (0,0)
		   x----------------------
		   |                     |
		   |                     |
		   ----------------------x
		            (window_width, window_height)
	   */
        const left = new Wall(0, 0, thickness, window_height);
        const right = new Wall(
            window_width - thickness,
            0,
            thickness,
            window_height
        );
        const top = new Wall(thickness, 0, window_width - thickness, thickness);
        const bottom = new Wall(
            thickness,
            window_height - thickness,
            window_width - thickness,
            thickness
        );

        return [left, right, top, bottom];
    }

    get_lines() {
        return get_rectangle_lines(this.x, this.y, this.w, this.h);
    }
}
