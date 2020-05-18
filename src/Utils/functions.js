export function sortByArtist(list){
    list.sort(function (a, b) {
        if (a.artist.toUpperCase() < b.artist.toUpperCase()) { return -1 }
        if (a.artist.toUpperCase() > b.artist.toUpperCase()) { return 1 }
        if (a.artist.toUpperCase() === b.artist.toUpperCase()) {
            if (a.title.toUpperCase() < b.title.toUpperCase()) { return -1 }
            if (a.title.toUpperCase() > b.title.toUpperCase()) { return 1 }
        }
        return 0
    })

    return list
}

export function filterByRecording(list, selectedRecording){
    return list.filter(function (recording) {
        return (recording.isrc !== "" && selectedRecording.isrc !== "" && recording.isrc.toUpperCase() === selectedRecording.isrc.toUpperCase()) || ((recording.title.toUpperCase().includes(selectedRecording.title.toUpperCase()) || selectedRecording.title.toUpperCase().includes(recording.title.toUpperCase())) && (recording.artist.toUpperCase().includes(selectedRecording.artist.toUpperCase()) || selectedRecording.artist.toUpperCase().includes(recording.artist.toUpperCase())))
    })
}

export function filterByText(list, text){
    return list.filter(function (recording) {
        return recording.title.toUpperCase().includes(text.toUpperCase()) || recording.artist.toUpperCase().includes(text.toUpperCase()) || recording.isrc.toUpperCase().includes(text.toUpperCase()) || recording.duration.includes(text.duration)
    })
}

export function removeRecording(list, element) {
    const index = list.indexOf(element)
    list.splice(index, 1)
    return list
}
