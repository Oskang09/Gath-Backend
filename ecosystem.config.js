module.exports = {
    apps: [
        {
            name: 'feathers',
            script: 'app.js',
            instances: "2",
            autorestart: true,
            watch: false,
            max_memory_restart: '200M',
        },
    ],
};