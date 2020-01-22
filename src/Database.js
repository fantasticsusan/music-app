import React from 'react';
import * as d3 from "d3";
import data from './files/sound_recordings.csv';

export async function retrieveDB() {

    var result = [];
    console.log("Input ", data);
    d3.csv(data, function(res) {
        console.log("Result ", res)
       result = res;
    });

    return (
        result
    );
};
