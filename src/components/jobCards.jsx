import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";

const JobCards = ({allJobs}) => {
    return ( 
        <div>
            <div className="row mt-2">
                    {
                        allJobs.map((jobs)=>(
                            <div className="col-md-4">
                                <div className="card p-3 my-2">
                                   <div className="div-flex">
                                     <h5 className="me-2">{jobs.jobTitle} </h5>
                                     <p className="fw-bold text-danger">{jobs.discretion}</p>
                                        <GrLocationPin />  {jobs.location}
                                   </div>
                                   <h6 className="text-primary"> {jobs.companyName}</h6>
                                   <p> {jobs.jobDescription.slice(0,50)}....</p>
                                   <Link 
                                   to={`/jobdetails/${jobs.id}`} 
                                   className="btn btn-outline-primary btn-sm"
                                   > More</Link>
                                </div>
                            </div>
                      ))
                    }
                </div>
        </div>
     );
}
 
export default JobCards;