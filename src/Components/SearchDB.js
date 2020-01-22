import React from 'react';
import  {retrieveDB} from '../Database';
function SearchDB() {

    const song = { "artist": "Ed Sheeran", "name": "Shape of you", "isrc": "765543", "duration": "655" };
    var songInput = [];
    songInput = retrieveDB();
    console.log(songInput);
    for(var i = 0; i < songInput.length; i ++){
        console.log("Song " + songInput[i]);
    }
    return (
        <div className="div_container">
            <p>Load searchDB</p>
            <select>

                {/* {songInput.map(song => {
                    return (<option key={song.isrc}value={song.isrc}>{song.title} - {song.artist} </option>);
                })} */}
            </select>
        </div>
    );
}
export default SearchDB;
