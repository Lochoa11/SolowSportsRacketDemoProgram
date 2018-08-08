const bcrypt = require('bcrypt-nodejs');

module.exports = (sequlize, DataTypes) => {
    const Users = sequlize.define('Users', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Users.beforeCreate(user => new sequlize.Promise((resolve) => {
        bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
            resolve(hashedPassword);
        });
    }).then((hashedPassword) => {
        user.password = hashedPassword;
    }));

    // Users.associate = (models) => {
    //     models.Users.hasMany(models.Rackets);
    // };

    return Users;
}