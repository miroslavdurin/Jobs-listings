import React from 'react';
import './JobOffer.css';

function JobOffer({job, handleAddFilters}) {
    const {id, company, contract, featured, languages, level, location, logo, position, postedAt, role, tools} = job;
    const isNew = job.new;

    function handleClick(e) {
        if(!e.target.closest('.btn-filter')) return;
        handleAddFilters(e.target.closest('.btn-filter').dataset.filter)
    }

    return (
        <div className="job">
            <div className="job--left">
                <div className="job__logo">
                    <img src={logo} alt={company} />
                </div>
                <div className="job__info">
                    <div className="job__company">
                        <h3 className="heading--h3">{company}</h3>
                        {isNew && <span className="span--new">New!</span> }
                        {featured && <span className="span--featured">Featured</span> }
                    </div>
                    <div className="job__position">
                        <h2 className="heading--h2">{position}</h2>                        
                    </div>
                    <div className="job__aditional-info">
                        <span className="span">{postedAt}</span>
                        <span className="span">&bull;</span>
                        <span className="span">{contract}</span>
                        <span className="span">&bull;</span>
                        <span className="span">{location}</span>
                    </div>
                </div>
            </div>
            <div className="job--right" onClick={handleClick}>
                <button className="btn-filter" data-filter={role}>{role}</button>
                <button className="btn-filter" data-filter={level}>{level}</button>
                {languages.map(language => <button key={language + " company"} className="btn-filter" data-filter={language}>{language}</button>)}
                {tools.length > 0 && tools.map(tool=><button key={tool + " company"} className="btn-filter" data-filter={tool}>{tool}</button>)}
            </div>
        </div>
    )
}

export default JobOffer