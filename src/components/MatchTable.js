import React, { useEffect, useState } from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import { CircularProgress } from '@material-ui/core';


//constand can be changed based on excel col name
const standards = ['Location', 'TechStack', 'Seniority', 'IOM'];

const URL = "JobURL";


const MatchTable = (props) => {
    
    const [table, setTable] = useState({
        cols: [...props.talent.cols, 
            {name: "L", key: 11},
            {name: "Link 1", key: 12},
            {name: "Link 2", key: 13},
            {name: "Link 3", key: 14},
            {name: "Link 4", key: 15},
            {name: "Link 5", key: 16},
            {name: "Preview", key: 17}],
        rows: [...props.talent.rows]
    })
    const [isbuilt,setIsBuilt] = useState(false);
    const [ready, setReady] = useState(false);

    const [jobs, setJobs] = useState({});



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

        // setIsBuilt(true);

        return  sortedResult
    };


    //Prepare email template job for each candidate, sorted data 
    const findJobs = (sortedResult) => {
        let jobTable = [...props.jd.rows].slice(1);
        let emailText = {};
        for (let index = 0; index < sortedResult.length; index ++) {
            emailText[index] = []
            for (let eachJob of sortedResult[index]) {
                emailText[index].push(jobTable[eachJob[0]]);
            }
        }
        return emailText;
    }

    // Parameter: [[job index: score],[job index: score],[job index: score],[job index: score],[job index: score], ]
    // Find job link for each candidate
    const findJobLink = (jobScoreArray, index) => {
        let jobTalbe = [...props.jd.rows].slice(1);
        let jobLinkPosition = [...props.jd.rows[0]].indexOf(URL);
        let joblinks = [];
        for(let eachJob of jobScoreArray) {
            
            joblinks.push(jobTalbe[eachJob[0]][jobLinkPosition]);

        }
        // console.log(`findjoblink function: joblinks for ${index} candidate, ${joblinks}`);
        return joblinks;
    }

    // Give sortedResult of all talents, output display table
    const buildTable = (sortedResult) => {
        let newTableRows = [...props.talent.rows];
        if (isbuilt === false) {
            // console.log(`props table rows before update ${newTableRows}`);
            for (let index = 0; index < sortedResult.length ; index ++) {
                let joblinks = findJobLink(sortedResult[index], index);
                // console.log(`buildTable funcion: job links for cadidate ${index} is ${joblinks}`);
                for (let eachJobLink of joblinks) {
                    newTableRows[index + 1 ].push(eachJobLink);
                }
                
            }
            setIsBuilt(true);
            return newTableRows;
        } else {
            return newTableRows;
        }
    }
 
    // Create standard map, get the posiiton of each criteria
    // Get sorted results for each talent
    // Append the data to original talent table
        

    useEffect(() => {

        const {talentMap , jdMap} = buildStandardTable();
        const  sortedResult = matchingAlgo({talentMap,jdMap});
        let newTableRows = buildTable(sortedResult);
        let emailText = findJobs(sortedResult);

        setTable({
            cols: [...table.cols],
            rows: newTableRows           
        });
        setReady(true);
        console.log(emailText);
    }, [isbuilt]);
       
    useEffect(() => {
        console.log('table update', table);
    },[table])

    useEffect(() => {
        console.log('isbuilt update', isbuilt);
    },[isbuilt])

    useEffect(() => {
        console.log('ready update', ready);
    },[ready])

    useEffect(()=> {
        setIsBuilt(false);
    }, [props]);

    return ( 
        
        <div className='table'>
         {  ready ?  <OutTable data={table.rows} columns={table.cols}  tableClassName="matchedDataTable"/> : <CircularProgress/> }
        </div>
          
        
        
    )
}

export default MatchTable;
