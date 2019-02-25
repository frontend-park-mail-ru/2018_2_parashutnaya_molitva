function getAllObjectMethodsNames (clazz) {
    if (typeof clazz !== 'object') {
        console.log('It\'s not a object || function');
        return;
    }

    if (!Object.getPrototypeOf(clazz)) {
        console.log('Protype is null');
        return;
    }

    const proto = Object.getPrototypeOf(clazz);
    return Object.getOwnPropertyNames(proto).filter((name) => typeof proto[name] === 'function');
}

export default function autoBind (clazz, pattern) {
    if (typeof clazz !== 'object') {
        console.log('It\'s not a object');
        return;
    }

    if (!Object.getPrototypeOf(clazz)) {
        console.log('Prototype is null');
        return;
    }
    const regex = new RegExp(pattern);
    const matchedNames = getAllObjectMethodsNames(clazz).filter((name) => regex.test(name));
    matchedNames.forEach((name) => void (clazz[name] = clazz[name].bind(clazz)));
}
