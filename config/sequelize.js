module.exports = {
    url: process.env.DATABASE_URL,
    // url: 'postgres://urrlfuahurievf:517173e543af53757c2aebdb1fb6ce4d3e4ac45cc932238ff8ff4cfb3dc15ee6@ec2-54-243-241-62.compute-1.amazonaws.com:5432/d2ti876em3mpd1',
    options: {
        decimal: true,
        timestamps: false,
        logging: false,
        dialect: "postgres",
        dialectOptions: {
            ssl: true,
        },
    },
};
