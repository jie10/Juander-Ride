function delay(callback, TIMEOUT_IN_SECONDS) {
    setTimeout(callback, TIMEOUT_IN_SECONDS);
}

function capitalize(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
}

function sortDateTime(arr, order, key) {
    if (order === 'desc') {
        return arr.sort((a,b) => new Date(b[key]).getTime() - new Date(a[key]).getTime());
    } else {
        return arr.sort((a,b) => new Date(a[key]).getTime() - new Date(b[key]).getTime());
    }
}