import { GrLocationPin } from "react-icons/gr";

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
                                   <button className="btn btn-outline-primary btn-sm"> More</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>
     );
}
 
export default JobCards;