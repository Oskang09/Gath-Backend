module.exports = {
    url: 'postgresql://postgres:oskang09@127.0.0.1:5432/gath',
    options: {
        timestamps: false,
        logging: false,
        dialect: "postgres",
        dialectOptions: {
            ssl: true,
        },
    },
};
