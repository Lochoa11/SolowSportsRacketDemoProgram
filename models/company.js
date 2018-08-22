module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        company_name: DataTypes.STRING, 
        image_URL: DataTypes.STRING, 
    });

    Company.associate = (models) => {
        models.Company.hasMany(models.Rackets);
    };

    return Company;
};