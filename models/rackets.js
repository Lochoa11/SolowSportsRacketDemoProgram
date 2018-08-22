module.exports = (sequelize, DataTypes) => {
    const Rackets = sequelize.define('Rackets', {
        model_name: DataTypes.STRING, 
        image_URL: DataTypes.STRING, 
        company: DataTypes.STRING,
        weight: DataTypes.STRING,
        string_pattern: DataTypes.STRING, 
        head_size: DataTypes.STRING,
        avalible: DataTypes.STRING,
        anticipated_return_date: DataTypes.DATE,
    });

    Rackets.associate = (models) => {
        models.Rackets.belongsTo(models.Company);
    }
    return Rackets;
};