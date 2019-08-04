function get_rectangle_lines(x, y, w, h) {
    return [
        [[x, y], [x + w, y]],
        [[x, y], [x, y + h]],
        [[x + w, y], [x + w, y + h]],
        [[x, y + h], [x + w, y + h]]
    ];
}
