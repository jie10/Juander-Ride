function delay(callback, TIMEOUT_IN_SECONDS) {
    setTimeout(callback, TIMEOUT_IN_SECONDS);
}

function capitalize(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
}

function sortDateTime(arr, order) {
    if (order === 'desc') {
        return arr.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else {
        return arr.sort((a,b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    }
}