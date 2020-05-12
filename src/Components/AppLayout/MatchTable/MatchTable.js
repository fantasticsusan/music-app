import React from 'react';
import {
    Badge,
    Popover
} from 'react-bootstrap';
import RecordingTable from "../../Common/Table";
import {EMPTY_FIELD, EMPTY_RECORDING} from "../../../utils/const";

function MatchTable(param) {

    const soundRecordingMatched = param.soundRecordingMatched;
    const deleteMatch = param.deleteMatch;

    const popover = (matchedRecord) => {
        return (<Popover id="popover-basic">
            <Popover.Title as="h3">{matchedRecord.title}</Popover.Title>
            <Popover.Content>
                <p><strong>Artist: </strong> {matchedRecord.artist}</p>
                {matchedRecord.isrc !== EMPTY_FIELD &&
                    <p><strong>ISRC: </strong> {matchedRecord.isrc}</p>
                }
                {matchedRecord.duration !== EMPTY_FIELD &&
                    <p><strong>Duration: </strong> {matchedRecord.duration}</p>
                }
            </Popover.Content>
        </Popover>);
    }

    const undoMatch = (registry) => {
        deleteMatch(registry);
    }


    return (
        <div className="table-match-container">
            <div className="table-header">
                <h2 className="subtitle"><i className="fas fa-database"/> Registry</h2>
                <div className="table-header-body">
                    <p><Badge variant="light">{soundRecordingMatched.length}</Badge> total matches</p>
                </div>
            </div>
            {soundRecordingMatched.length !== 0 &&
            <RecordingTable
                elements={soundRecordingMatched}
                selectedRecording={EMPTY_RECORDING}
                popover={popover}
                undoMatch={undoMatch}
                isMatchTable={true}
            />
            }
        </div>
    )
}
export default MatchTable
