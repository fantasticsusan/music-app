export function sortByArtist(list){
    list.sort(function (a, b) {
        if (a.artist < b.artist) { return -1 }
        if (a.artist > b.artist) { return 1 }
        if (a.artist === b.artist) {
            if (a.title < b.title) { return -1 }
            if (a.title > b.title) { return 1 }
        }
        return 0
    })

    return list
}
