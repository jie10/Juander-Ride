function delay(callback, TIMEOUT_IN_SECONDS) {
    setTimeout(callback, TIMEOUT_IN_SECONDS);
}

function capitalize(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
}

function capitalizeWords(word) {
    return word.split(' ').map(function (w) {
        if (w.toLowerCase() === 'of') {
            return w.toLowerCase();
        } else {
            return w.substring(0, 1).toUpperCase() + w.substring(1).toLowerCase();
        }
    }).join(' ');
}

function sortDateTime(arr, order, key) {
    if (order === 'desc') {
        return arr.sort((a,b) => new Date(b[key]).getTime() - new Date(a[key]).getTime());
    } else {
        return arr.sort((a,b) => new Date(a[key]).getTime() - new Date(b[key]).getTime());
    }
}