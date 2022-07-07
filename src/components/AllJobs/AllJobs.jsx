import React from 'react';
import './AllJobs.css';
import JobOffer from '../Job/JobOffer';

function AllJobs({allJobs}) {
    console.log(allJobs)
    return (
        <div>
            <JobOffer job={allJobs[0]} />
        </div>
    )
}

export default AllJobs;