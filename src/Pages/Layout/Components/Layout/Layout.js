import React from 'react'
import {
    AddRecordingDB,
    InputRecordingTable,
    MatchedRecordingTable,
    ResultRecordingTable
} from '../../../../Pages'

function Layout() {
    return (
        <div aria-live="polite" aria-atomic="true" className="body-container">

            <div className="columns">
                <div className="column is-offset-8-desktop">
                    <AddRecordingDB/>
                </div>
            </div>
            <div className="columns">
                <div className="column is-half is-full-mobile">
                    <InputRecordingTable/>
                </div>
                <div className="column is-half is-full-mobile">
                    <ResultRecordingTable/>
                </div>
            </div>
            <div className="columns">
                <div className="column is-full">
                    <MatchedRecordingTable/>
                </div>
            </div>
        </div>
    )
}

export default Layout
