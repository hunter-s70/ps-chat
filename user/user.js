function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    return `Hello ${who.name}!`;
};

exports.User = User;