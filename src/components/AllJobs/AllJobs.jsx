import React, {useState, useEffect} from 'react';
import './AllJobs.css';
import JobOffer from '../Job/JobOffer';
import { motion, AnimatePresence } from 'framer-motion';

function AllJobs({allJobs}) {
    const [filters, setFilters] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [prevJobs, setPrevJobs] = useState([]);
    let [isJobsUpdated, setIsJobsUpdated] = useState(true);

    useEffect(()=>{/* 
        setPrevJobs([...jobs]); */
        
        if(filters.length === 0) {
            setJobs([...allJobs]);
            return;
        }

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
        setJobs([...newJobs]);  
        
    },[filters])

    useEffect(()=>{
        
        if(prevJobs.length === jobs.length) setIsJobsUpdated(false);
        else setIsJobsUpdated(true)
    }, [prevJobs, jobs])
    console.log(isJobsUpdated)

/* 
    console.log(prevJobs.length, jobs.length)  */
    function handleAddFilters(filter) {
        if(filters.some(f=>f===filter)) return;
        setPrevJobs([...jobs]); 
        setFilters((state)=> state = [...filters, filter]);
    }

    function handleRemoveFilters(e) {
        if(!e.target.closest(".remove-icon")) return;

        const removedFilter = e.target.closest(".btn-remove-filter").dataset.filter;

        const newFilters = filters.filter(f=> f.toLowerCase() !== removedFilter.toLowerCase());
        
        setPrevJobs([...jobs]); 
        setFilters([...newFilters]);
        setJobs([...allJobs]);
    }

    function handleClearAllFilters() {
        setFilters([]);
    }

    return (
        
            <div /* 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}} 
                transition={{
                    duration: 1
                }} */
                className={`container ${filters.length > 0 && 'translate'}`} key={filters}>
                {filters.length > 0 &&
                    <div className="filters-container" onClick={handleRemoveFilters}> 
                        <div className="filters-buttons">
                            { filters.map(filter=> 
                                <button key={filter + " filter"} data-filter={filter} className='btn-remove-filter'>
                                    <span>{filter}</span>
                                    <svg className="remove-icon" id="icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fillRule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
                                </button> 
                            )}   
                        </div>  
                        <div className="filters-btn-clear">
                            <button onClick={handleClearAllFilters} className="btn-clear-filters">Clear</button>
                        </div>
                    </div>
                }
                {                
                    jobs.map(job=><JobOffer key={job.company} isJobsUpdated={isJobsUpdated} handleAddFilters={handleAddFilters} job={job} />)
                }  
                     
            </div>       

    )
}

export default AllJobs;