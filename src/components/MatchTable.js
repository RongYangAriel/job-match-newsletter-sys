import React, { useState } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

const standards = ['Location', 'TechStack', 'Seniority', 'IOM'];

const MatchTable = (props) => {

    const [matchData, setMatchData] = useState({});

    // Find the standarad col index in both excel
    const buildStandardTable = () => {
        let talentMap = {};
        let jdMap = {};
        for (let standard of standards) {
            for (let index = 0; index < props.talent.rows[0].length; index++) {
                if(props.talent.rows[0][index] === standard){
                    talentMap[standard] = index;
                }
            }
        }
        for (let standard of standards) {
            for (let index = 0; index < props.jd.rows[0].length; index++) {
                if(props.jd.rows[0][index] === standard){
                    jdMap[standard] = index;

                }
            }
        }

        return {talentMap, jdMap}
    }

    const {talentMap , jdMap} = buildStandardTable();

    const matchingAlgo = ({talentMap, jdMap}) => {


        // Key:talent Index; value: {jobIndex: score}
        let matchResult = {};
        
        //
        let talentTable = props.talent.rows.slice(0);
        let jobTable = props.jd.rows.slice(0);


        for (let talentIndex = 0; talentIndex < talentTable.length; talentIndex ++) {
            
            matchResult[talentIndex] = {};

            for (let jobIndex = 0; jobIndex < jobTable.length; jobIndex ++ ) {
                let jobTalentScore = 0;

                for (let standard of standards) {
                    // console.log(standard);

                    if (talentTable[talentIndex][talentMap[standard]] == jobTable[jobIndex][jdMap[standard]]){
                        jobTalentScore ++;
                    }
                }

                matchResult[talentIndex][`${jobIndex}`] = jobTalentScore;
            }
        }
        return matchResult
    };



    console.log(matchingAlgo({talentMap , jdMap}));

    return (
        <OutTable data={props.jd.rows} columns={props.jd.cols}/>
    )
}

export default MatchTable;
