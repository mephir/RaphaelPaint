Object.prototype.addClass = function (className) {
  var classes = this.className.split(/\s+/);
  for (var x in classes) {
    if (classes[x] && classes[x] == className) { return this; }
  }
  classes.push(className);
  this.className = classes.join(' ');
  return this;
}