import React from 'react';
import './JobOffer.css';

function JobOffer({job}) {
    const {id, company, contract, feature, languages, level, location, logo, postedAt, role, tools} = job;
    const isNew = job.new;

    return (
        <div className="job">
            {company}
        </div>
    )
}

export default JobOffer