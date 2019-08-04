function get_rectangle_sides(rect) {
    return [
        [[rect.x, rect.y], [rect.x, rect.y + rect.h]],
        [[rect.x + rect.w, rect.y], [rect.x + rect.w, rect.y + rect.h]]
    ];
}

function get_rectangle_top_bottom(rect) {
    return [
        [[rect.x, rect.y], [rect.x + rect.w, rect.y]],
        [[rect.x, rect.y + rect.h], [rect.x + rect.w, rect.y + rect.h]]
    ];
}

function get_rectangle_lines(rect) {
    return get_rectangle_sides(rect).concat(get_rectangle_top_bottom(rect));
}

function calc_slope(x1, y1, x2, y2) {
    if (x1 == x2) return false;
    return (y1 - y2) / (x1 - x2);
}
function yInt(x1, y1, x2, y2) {
    if (x1 === x2) return y1 === 0 ? 0 : false;
    if (y1 === y2) return y1;
    return y1 - calc_slope(x1, y1, x2, y2) * x1;
}
function getXInt(x1, y1, x2, y2) {
    var slope;
    if (y1 === y2) return x1 == 0 ? 0 : false;
    if (x1 === x2) return x1;
    return (-1 * ((slope = calc_slope(x1, y1, x2, y2)) * x1 - y1)) / slope;
}

function getIntersection(x11, y11, x12, y12, x21, y21, x22, y22) {
    var slope1, slope2, yint1, yint2, intx, inty;
    if (x11 == x21 && y11 == y21) return [x11, y11];
    if (x12 == x22 && y12 == y22) return [x12, y22];

    slope1 = calc_slope(x11, y11, x12, y12);
    slope2 = calc_slope(x21, y21, x22, y22);
    if (slope1 === slope2) return false;

    yint1 = yInt(x11, y11, x12, y12);
    yint2 = yInt(x21, y21, x22, y22);
    if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

    if (slope1 === false) return [y21, slope2 * y21 + yint2];
    if (slope2 === false) return [y11, slope1 * y11 + yint1];
    intx = (slope1 * x11 + yint1 - yint2) / slope2;
    return [intx, slope1 * intx + yint1];
}
