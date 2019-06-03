const { 
    setByDot,
    keep,
    keepInArray,
    disallow,
    discard
} = require('feathers-hooks-common');

const traverse = (object, fn) => {
    Object.keys(object).forEach(
        (key) => fn(key, object[key])
    );
};

const extend = (array, newArray) => {
    if (newArray) {
        newArray.forEach((v) => array.push(v));
    }
};

const findAndUpdate = (arr, predicate, update) => {
    for (const a of arr) {
        if (predicate(a)) {
            update(a);
            return true;
        }
    }
    return false;
};

const intersectionArray = (array, otherArray) => {
    return array.length >= otherArray.length 
        ?  array.filter(arr => otherArray.includes(arr)) 
        : otherArray.filter(arr => array.includes(arr));
};

const filterFieldFromArrayObject = (arrayObject, ...fields) => {
    const array = [];
    for (const object of arrayObject) {
        array.push(filterFieldFromObject(object, ...fields));
    }
    return array;
};

const filterFieldFromObject = (object, ...fields) => {
    const data = {};
    for (const key of fields) {
        if (object[key]) {
            data[key] = object[key];
        }
    }
    return fields.length === 1 ? data[fields[0]] : data;
};

const createObjectFromArray = (array, value) => {
    const object = {};
    for (const arr of array) {
        object[arr] = value;
    }
    return object;
};

const objectHasKeys = (object, ...keys) => {
    const objKeys = Object.keys(object);
    if (objKeys.length < keys.length) {
        return false;
    }

    for (const key of keys) {
        if (!objKeys.includes(key)) {
            return false;
        }
    }
    return true;
};

module.exports = {
    traverse,
    extend,
    intersectionArray,
    createObjectFromArray,
    filterFieldFromArrayObject,
    filterFieldFromObject,
    objectHasKeys,
    setByDot,
    keep,
    keepInArray,
    disallow,
    discard,
    findAndUpdate
};