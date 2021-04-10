import React, { useState } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

const standards = ['Location', 'TechStack', 'Seniority', 'IOM'];

const MatchTable = (props) => {

    const [matchData, useMatchData] = useState({});

    const matchingAlgo = () => {
        let standardColMap = {};
        for (let standard of standards) {
            for (let index = 0; index < props.talent.rows[0].length; index++) {
                if(props.talent.rows[0][index] === standard){
                    standardColMap[standard] = index; 
                }
            }
        }
        for (let candidate of props.talent.rows.slice(0)) {
            console.log(candidate)
        }

    };

    matchingAlgo();

    return (
        <OutTable data={props.talent.rows} columns={props.talent.cols}/>
    )
}

export default MatchTable;
