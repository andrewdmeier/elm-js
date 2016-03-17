var DrawHook = function DrawHook(elements) {
    if (!(this instanceof DrawHook)) {
        return new DrawHook(elements);
    }
    this.elements = elements;
};

DrawHook.prototype.hook = function(node) {
    // Get Canvas Context
    var ctx = node.getContext('2d');

    // Clear canvas to prepare for redraw
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw
    this.elements.forEach(function(elem) {
        ctx.fillStyle = elem.fill;
        ctx.fillRect(
            elem.x,
            elem.y,
            elem.width,
            elem.height
        );
    });
};

// TODO: unhook? necessary?

module.exports = DrawHook;
