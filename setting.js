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
        url: 'postgresql://postgres:oskang09@127.0.0.1:5432/gath',
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
        private_key_id: "4a9b0ff14728612f2686024890e304f15c18dc19",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwse1DqA+CTwXk\nXDhIpPvsQU910s+w6MKQbJ9CTrMO/pakK3vY+bblNBFoMaN32RmsQRAPbYLGQZEi\nw8caYgBEC7fCsggnztsEOvnQMGqi3jLbESgSqXMro9VRd/jXnyjs0lFxuZqGKQtj\nw1QtPHQ3vKhDP8l7tb0AOyQEJX7ijIbFW0erlUkAhccg0VnBsDm9TStw3QjfmEpk\nVH3Jnpi+MSiszkR4b3dPuzeKh/noSm6w4NwGGt8LPSZ8Q3HrWru9+EFNRIkyPdQl\nddDjUuM0ZB18wV0zUpn6ESx1meY5hZUAokS5ykN2E6oieC58YQDPA/+k3/B/9qpI\n4nJOPR0hAgMBAAECggEACTkwdnCmZpnzZ8k8kuYx1FJQcIkRmF1+EoXpBlAPXsAB\nYw52B4x5dJt0MSkuLEpj4a7/xJ5lzi2MAvGPShxFgUfPTtV2QYW1vxHJCooMdvX8\nV50cp2S7A1MpBnipv6+qNjqAT9xtaYVo98sxcK8QLfymF+STguaouANeTO0cI302\nMvTRvRLPRvJmunxB0oqe6LWEIL+adj3isPDZuzxTPnP4cVv0Mr8LMkRoSRmKXOBl\n59wJiPe3H2BV6Wq6yeV99WKD+9h44m/aQIDeAVWrBiFbxFPVKbF+it7b2Iu/UEew\njRFbq/xZziVVMvZCPftAEwUbTHCRgvyj3rubSwoNwQKBgQDXn/vymGAODL6S5GeN\npdHKPjXaY8d2tuPoDvpesdZIamn764Rr07Hvv7ag4w2by/1D9tGf8wX0mUZyVRic\n4GTOdPEFzqrzBxHTzJPBq4hy22iaBxMiI1MNu3ppUzE3pQHneLw+Fo4kJfLjzwq/\n+v8VMOqaKq2Yh/+fBcjaQXuoKQKBgQDRx9TENV12r7SFNm2ED5Az1Kq/aIyJtu8h\n116Pojegtp1tKSAfiCLuW7108SApGS0nttiT7UXZYGsyCe9TT+9HF8Dc4UTlpZ3Y\nD50Z5170ER1+saai0KQpEJyx97XYHBwMXG2Q5rtHAvdKwZ7hWrt9cdwo+OWlAQIh\nPBrdOJTMOQKBgQCRYKIj7CxHDLyomSpgTD5n1w3EEqX3GlQKr56KnehVprmSSjZb\n5L0BYgal7q/MLPqzCgRHjTiks3rVtx4DFx+gOyQNwEtt04RngnTUjOxQVDHwN3jk\n+WAT0CU2Qgra83uXLsXsLpTjNlrO0Vb0HSxCg1qJWuD0CC2GcAX9cU0IEQKBgB5e\n397IGw/jwC7JAnHsDuRyFYZAjJgjc9tiYr5IreUGiyQSoCPwgZ4gif00K4PHsVHe\nltxTrZka7GoCJjPZjrqsJa/UrTTSFVgCaqwlYwnSsIJ3Fbjcm+eWEBlz00/GQglI\nGFSyEsrlEwgvn+DgUeSHZ2hHIHgS/Uvyd7EvT9uBAoGAdnGTyy9xPwVmwUUyMQ3L\nv7VImh9BKCBLmPzJxRLtHZe9XqG7RybDQhhPmNjvb2UQLe1zOXTlM3AkY+YanhUy\nWJmetj1Lz29wv4KVwyFliCduZgLfDd+Xgt6f/VDoBJ0hTaN9WUximwKgmmB5UWXh\nu2XlJ2Zn5lapDzeJxu9vPw8=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-d4vi9@gathfyp2019.iam.gserviceaccount.com",
        client_id: "116270981760227970095",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d4vi9%40gathfyp2019.iam.gserviceaccount.com"
    },
    messages: {
        INVALID_JSON_BODY: {
            message: `Incoming data isn't 'application/json'.`,
        },
        MISSING_HEADER_TOKEN: {
            message: `Header 'gath-token' is required.`
        },
    },
};