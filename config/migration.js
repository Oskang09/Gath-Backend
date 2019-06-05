module.exports = {
    dialect: "postgres",
    url: process.env.DATABASE_URL || 'postgresql://postgres:oskang09@127.0.0.1:5432/gath',
};
