import React, { useState } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';


//constand can be changed based on excel col name
const standards = ['Location', 'TechStack', 'Seniority', 'IOM'];

const URL = "JobURL";


const MatchTable = (props) => {

    const result = {
            cols: [...props.talent.cols, {name: 'joblinks', key:'joblinks'}, {name: 'Preview(Popup)', key:'popup'}],
            rows: [...props.talent.rows]
        };
    
    const [isbuilt,setIsBuilt] = useState(false);

   


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


    // Take two cretia position map as input
    const matchingAlgo = ({talentMap, jdMap}) => {
        // Key:talent Index; value: {jobIndex: score}
        let matchResult = {};
        let sortedResult = [];
        //
        let talentTable = props.talent.rows.slice(1);
        let jobTable = props.jd.rows.slice(1);


        for (let talentIndex = 0; talentIndex < talentTable.length; talentIndex ++) {

            matchResult[talentIndex] = {};
            sortedResult[talentIndex] = [];

            for (let jobIndex = 0; jobIndex < jobTable.length; jobIndex ++ ) {
                let jobTalentScore = 0;

                for (let standard of standards) {
                    // console.log(standard);

                    if (talentTable[talentIndex][talentMap[standard]] === jobTable[jobIndex][jdMap[standard]]){
                        jobTalentScore ++;
                    }
                }
                // console.log(`index: ${talentIndex}, talent: ${talentTable[talentIndex]}`);
                matchResult[talentIndex][`${jobIndex}`] = jobTalentScore;
            }
            
            sortedResult[talentIndex] = Object.entries( matchResult[talentIndex]).sort((a,b) => b[1] - a[1]).slice(0,5);

            // console.log('matched scroe', matchResult[talentIndex]);
            // console.log('ranked index', sortedResult[talentIndex]);
        }

        console.log('whole sorted result', sortedResult);

        return  sortedResult
    };


    // Parameter: [[job index: score],[job index: score],[job index: score],[job index: score],[job index: score], ]
    const findJobLink = (jobScoreArray) => {
        let jobTalbe = props.jd.rows.slice(1);
        let jobLinkPosition = props.jd.rows[0].indexOf(URL);
        let joblinks = [];
        for(let eachJob of jobScoreArray) {
            
            joblinks.push(jobTalbe[eachJob[0]][jobLinkPosition]);

        }
        return joblinks;
    }

    // Give sortedResult of all talents, output display table
    const buildTable = (sortedResult, table) => {
        console.log(sortedResult.length);
        // for (let index = 1; index < sortedResult.length ; index ++) {
        //     table.rows[index+1].push(findJobLink(sortedResult[index]));
        //     console.log('after add one row', table);
        // }
        
        setIsBuilt(true);
    }

    const {talentMap , jdMap} = buildStandardTable();

    let sortedResult = matchingAlgo({talentMap,jdMap});

    console.log(sortedResult);

    return ( 
        <div className='table'>
            {  isbuilt ?  <p> loading </p> :  <OutTable data={result.rows} columns={result.cols}/>}
        </div>
          
        
        
    )
}

export default MatchTable;
