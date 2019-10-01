const Glob        = require('glob');
const Joi         = require('joi');

module.exports = function (router, globalScope) {
    const middleware = {};
    for (const mw of Glob.sync('../src/middleware/**/*.js', { cwd: __dirname })) {
        const module = require(mw);
        middleware[module.name] = module.handler.bind(globalScope);
    }

    for (const api of Glob.sync('../src/api/**/*.js', { cwd: __dirname })) {
        const module = require(api);
        const accessFlow = [];
        const schema = Joi.object().keys(module.schema || {});
        module.handler = module.handler.bind(globalScope);
    
        if (module.path.api) {
            if (module.before) {
                for (const before of module.before) {
                    if (typeof before === 'string') {
                        accessFlow.push(middleware[before]({}));
                    } else if (typeof before === 'object') {
                        accessFlow.push(middleware[before.middleware](before.params));
                    } else if (typeof before === 'function') {
                        accessFlow.push(before);
                    }
                }
            }

            accessFlow.push(
                async function (ctx, next) {
                    const params = Object.assign({}, ctx.request.body, ctx.params, ctx.query);
                    if (module.schema) {
                        const result = schema.validate(params);
                        if (result.error) {
                            throw "JOI_VALIDATE_ERROR";
                        }
                    }
                    const response = {};
                    const result = await module.handler(params, ctx);
                    console.log(result);
                    if (result.pagination) {
                        const { page, count, limit } = result.pagination;
                        const pageCount = Math.ceil(count / limit);
                        const queries = Object.keys(ctx.query);
                        response['_meta'] = {
                            currentPage: page,
                            totalCount: count,
                            perPage: limit,
                            pageCount,
                        };

                        const path = ctx.request.path;
                        const queryString = queries.map(
                            (query) => {
                                if (query === 'page' || query === 'limit') return;
                                return `${query}=${ctx.query[query]}`
                            }
                        );
                        const buildQS = (pageNumber) => `${path}?${queryString.join('&')}&page=${pageNumber}&limit=${limit}`;
                        response['_paginate'] = {
                            first: buildQS(1),
                            prev: page > 1 ? buildQS(page - 1) : buildQS(1),
                            self: buildQS(page),
                            next: page <= pageCount ? buildQS(page + 1) : buildQS(page),
                            last: buildQS(pageCount),
                        };
                        response.result = result.result;
                    } else {
                        response.result = result;
                    }

                    ctx.body = {
                        ok: true,
                        ...response
                    };
                    return next();
                }
            );

            if (module.after) {
                for (const after of module.after) {
                    if (typeof after === 'string') {
                        accessFlow.push(middleware[after]({}));
                    } else if (typeof after === 'object') {
                        accessFlow.push(middleware[after.middleware](after.params));
                    } else if (typeof after === 'function') {
                        accessFlow.push(after);
                    }
                }
            }
            router[module.method.toLowerCase()](module.path.api, ...accessFlow);
        }
    
        if (module.path.internal) {
            globalScope.api[module.path.internal] = function (params, ctx = null, isForm = false) {
                if (module.schema) {
                    const result = schema.validate(params);
                    if (result.error) {
                        throw "JOI_VALIDATE_ERROR";
                    }
                }
                return module.handler(params, ctx, isForm);
            };
        }
    }
};