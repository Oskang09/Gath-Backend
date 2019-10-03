module.exports = {
    helmet: {
        hidePoweredBy: {
            setTo: 'GATH 0.0.1'
        }
    },
    bodyparser: {
        enableTypes: [ 'json', 'form' ],
        encoding: "utf8",
        multipart: true,
        urlencoded: true,
    },
    sequelize: {
        // url: process.env.DATABASE_URL,
        url: 'postgresql://postgres:oskang09@127.0.0.1:5432/gath',
        // url: 'postgres://nkgeeaxludrqgq:f231a947b467d64c46fa4fd688a393bd64d809fdee290d406d3ecf8c4bed877c@ec2-54-235-100-99.compute-1.amazonaws.com:5432/d489ilhado36jm',
        options: {
            timestamps: false,
            logging: false,
            dialect: "postgres",
            dialectOptions: {
                ssl: true,
            },
        },
    },
    firebase: {
        type: "service_account",
        project_id: "gathfyp2019",
        private_key_id: "79034f9d39d93c2418e63c125dd6b55a3d7cf0f4",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvdYjXcT+Pe0xP\nO5LWneuGmfMSgdakn/OuTMLm0BK44z3Pl6NoALapAQRXxn/7L9L6NLSQKrbxu1R1\nffAMLZp0nIPBHccsSJiHrn5ckKlCVfzp/7zxvFn2/WmhZP1wHtrUFz7thpII69oN\nHQXXuV79d0QYyav8zwrsJNL82v2g0ZtO6Ob/j13bmiTsQq/NUtmORNeDkdTMg+oy\njoe/NJSHG4RU8UJimm5K87UUWOFuxFcjmfdH+mjMv3K5Jfa109kNbiC/diCe1NU7\n8STYEp6Pc2xNdpn0LYK8p1XwQZvhsmI7KrYsSWn6/i4Drv8PNPSp9uRrtegUdeGT\nWjUvXTGFAgMBAAECggEAFhBcZyUzVjZty+fkqO7eY4R/+9OOe5Cuqrw15SMEu7G9\nv9lkf8tZLOr3Eheg1+Q1bmfKzfdFHqRNNGIkGc/xRJk6+0GknnW5kpRXiQna8v/P\nqFhTuP1TvdqzmgtSUHNc1r9ely1tN0h7WNtNtQk3P/3rtwdDRKz/hV8DFi9upfaI\nW5LPBDn7fcYrk3oYNp9S0efMR11ZDPXSX9xMauuZQa72zTC+XQv5wUHL7mJGOhf+\nC4JHKaHaTKyuraC8TeP6yGZ0JiV0DMjVgiUlC1PmqDi5akLBi0HN6Dv13Ws9SYvw\n/S7Shvar3+Fkjgevosfq8279tOiS0kyDbR/DDr3R4QKBgQDiTDd9e92DXh3bc7By\nX+eHPYQYOLr33Iy2OFY98eWfeimjBCYXEEiK1YIKPAMiTi8/dbrQryJiKfCVx6Sz\n8iKk7Rpp8nn8WvsRIjXhtMr5D5AO3DtjwXLTRFtA2HcDOnd9jaDwTMijjrXmCzzA\nQPNWfku1RKQ+YiUD10LNF9uupQKBgQDGfRmwTnXLLv3NVnFmco0gvzXNqWxHp0If\n/YXSP479FlGv+3wak8RyuxQVXvDvZVmASN4E91J+sc/qgChmElfiNV1xbvION+Ee\ncNvxU2oAvnn8iIAH1/eWbIk+K4lfYxP0UndyZbCqA5dE68HY90IVmQ1NBeZ4VU9U\nTIOgFU3hYQKBgF5AoFwDWx9787OTW8pHZ4dMd9geyMCze2fpzwG93oWtu+nJsJOq\nlIw+oQriM+v15Hfp8QU57Hg2P54iqNbJ4uQOXRIDjAsvWaKpPQfk5SUW9kk6MQI7\ncDfOILPBdNBDacFBW+a6FFcK+Xf29jac1r0PnTjCfiX9eq0+2vPRHA6BAoGAHpuH\n7JIMxAo5BQMBdaTQcm5J467ujZYTMk+r5SH78LcSXarQFmEW+AI1NJ5xVNkyFgAm\njGl/BR5yS1z73dGST8We5TEQjnS7eDA7GlmcjQTSVsjNxWfePAn8l+OqyVTD7PcS\niEd6GJ15JB2exNBMFnyFeo0gXwn4s60g1vyyB8ECgYEAgxfqilr09e5cu1rz1x+U\n8/Lh+1llTmQurIVE6izQDn6l1N64D1FvMdbxUn+tWfhT1hcdFW/ca1ry9fC5YwoI\naYl/JlPq0lyGvbX5yQbDSlYGBSI02d5vu2lPX9+Cln3IAqmKQ6NgbupZAxr4IGOb\nOqND/FV4Y7frMTflTEvc4p8=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-d4vi9@gathfyp2019.iam.gserviceaccount.com",
        client_id: "116270981760227970095",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d4vi9%40gathfyp2019.iam.gserviceaccount.com"
    },
    messages: {
        INVALID_JSON_BODY: `Incoming data isn't 'application/json'.`,
        MISSING_HEADER_TOKEN: `Header 'gath-token' is required.`,
        EXPIRED_VOUCHER: 'Voucher have been expired.',
        MISSING_EVENT: `Event doesn't exists.`,
        NOT_EVENT_OWNER: `You aren't event owner of the event.`,
        MISSING_USER_PARAM: 'Missing target user parameters.',
        NOT_IN_EVENT: `You aren't in the event.`,
        HAVENT_JOIN_EVENT: `You haven't join the event.`,
        EVENT_ENDED: 'Event already ended.',
        EVENT_STARTED: 'Event already started.',
        NO_EVENT_RUNNING: 'No event is running for now.',
        MISSING_INSTANCE: 'Missing target instance.',
        ALREADY_COMMENT: `You already review the user.`,
        UTAG_UNIQUE_VIOLATION: 'Your alias have been used by another user, please choose another.',
        USED_VOUCHER: 'Voucher already used.'
    },
};