import React, {useState, useEffect} from 'react';
import './AllJobs.css';
import JobOffer from '../Job/JobOffer';
import { motion, AnimatePresence } from 'framer-motion';

function AllJobs({allJobs}) {
    const [filters, setFilters] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [prevJobs, setPrevJobs] = useState([]);
    const [isJobsUpdated, setIsJobsUpdated] = useState(true);
    const [showFiltersContainer, setShowFiltersContainer] = useState(false);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(()=>{
        
        if(filters.length === 0) {
            setJobs([...allJobs]);
            setShowFiltersContainer(false);
            setAnimationFinished(false);
            setIsJobsUpdated(true)
            return;
        }        

        if(filters.length > 0) setShowFiltersContainer(true);

        /* Declaring and using new variables is necessary because useState doesn't always update synchronously and there
        was a bug when some filters were removed */

        let newJobs = [...allJobs];
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

        if(prevJobs.length === newJobs.length) setIsJobsUpdated(false);
        else setIsJobsUpdated(true);

    },[filters])

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
    }

    function handleClearAllFilters() {
        setFilters([]);
        setPrevJobs([...jobs]); 
        setIsJobsUpdated(true);
    }

    return (        
            <div className={`container ${showFiltersContainer && 'translate'}`} key={filters}>
                <h1 className='sr-only'>Jobs listings site with filtering logic</h1>
                
                <AnimatePresence>
                    {showFiltersContainer &&
                            <motion.div className="filters-container" onClick={handleRemoveFilters}                            
                                initial={!animationFinished && {opacity: 0}}
                                animate={!animationFinished && {opacity: 1}}
                                transition={{duration: 0.5}}
                                onAnimationComplete={()=>setAnimationFinished(true)}
                            > 
                                <div className="filters-buttons">
                                    { filters.map((filter)=> 
                                        <motion.button layoutId={filter} key={filter + " filter"} data-filter={filter} className='btn-remove-filter'>
                                            <span>{filter}</span>
                                            <svg className="remove-icon" id="icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fillRule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/></svg>
                                        </motion.button> 
                                    )}   
                                </div>  
                                <div className="filters-btn-clear">
                                    <button onClick={handleClearAllFilters} className="btn-clear-filters">Clear</button>
                                </div>
                            </motion.div>               
                    }                
                </AnimatePresence>     
                    <motion.div className={`jobs-container ${showFiltersContainer && 'translate'}`}
                        key={isJobsUpdated}           
                        initial={isJobsUpdated && {opacity: 0}}
                        animate={isJobsUpdated && {opacity: 1}}
                        transition={{
                            duration: 0.5
                        }}
                    >
                        { jobs.map(job=> <JobOffer key={job.company} handleAddFilters={handleAddFilters} job={job} />) } 
                    </motion.div>                                                
            </div>       
    )
}

export default AllJobs;