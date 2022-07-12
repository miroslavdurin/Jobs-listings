import React, {useState, useEffect} from 'react';
import './AllJobs.css';
import JobOffer from '../Job/JobOffer';
import iconRemove from '../../images/icon-remove.svg';

function AllJobs({allJobs}) {
    const [filters, setFilters] = useState([]);
    const [jobs, setJobs] = useState([]);

    /* role, level, languages, tools */


    useEffect(()=>{
        setJobs([...allJobs]);
    }, [])

    useEffect(()=>{
        /* Declaring and using new variables is necessary because useState doesn't always update synchronously and there
        was a bug when some filters were removed */

        let newJobs = [...jobs];
        filters.forEach(filter=>{
            const filterJobs = newJobs.filter(job=> 
                job.role === filter || 
                job.level === filter || 
                job.languages.find(language=>language === filter) ||
                job.tools.length > 0 && job.tools.find(tool => tool === filter)
            )

            newJobs = [...filterJobs];            
        })    
        if(newJobs.length === 0) return;    
        setJobs([...newJobs])     
    },[filters])

    function handleAddFilters(filter) {
        if(filters.some(f=>f===filter)) return;
        setFilters((state)=> state = [...filters, filter]);
    }

    function handleRemoveFilters(e) {
        if(!e.target.classList.contains("remove-icon")) return;

        const removedFilter = e.target.closest(".filter-btn").dataset.filter;

        const newFilters = filters.filter(f=> f.toLowerCase() !== removedFilter.toLowerCase());

        
        setFilters([...newFilters]);
        setJobs([...allJobs]);
    }

    return (
        <div className='container' key={filters}>
            <div className="filters-container" onClick={handleRemoveFilters}>
                {filters.length > 0 &&
                    filters.map(filter=> <button key={filter + " filter"} data-filter={filter} className='filter-btn'>
                        <span>{filter}</span>
                        <img className="remove-icon" src={iconRemove} alt={ `remove ${filter} filter` } />
                    </button> )
                }
            </div>
            {                
                jobs.map(job=><JobOffer key={job.company} handleAddFilters={handleAddFilters} job={job} />)
            }       
        </div>
    )
}

export default AllJobs;