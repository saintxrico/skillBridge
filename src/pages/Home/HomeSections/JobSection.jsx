import {useState} from "react";
import JobCards from "../../../components/jobCards";

const JobSection = () => {
const [jobs, setJobs] = useState([
    {
        id: 1,
        jobTitle: "Frontend Developer",
        companyName: "Bright Labs",
        discretion: "fulltime",
        jobDescription: "Build and maintain responsive user interfaces using React and modern CSS frameworks.",
        location: "Nairobi, Kenya"
    },
    {
        id: 2,
        jobTitle: "Backend Engineer",
        companyName: "Datastream Inc.",
        discretion: "fulltime",
        jobDescription: "Design and implement scalable APIs and manage database architecture for high-traffic applications.",
        location: "Remote"
    },
    {
        id: 3,
        jobTitle: "Graphic Designer",
        companyName: "Pixel Studio",
        discretion: "parttime",
        jobDescription: "Create visual concepts and branding materials for clients across various industries.",
        location: "Nairobi, Kenya"
    },
    {
        id: 4,
        jobTitle: "Data Analyst",
        companyName: "Insight Metrics",
        discretion: "fulltime",
        jobDescription: "Analyze large datasets to identify trends and provide actionable business insights.",
        location: "Mombasa, Kenya"
    },
    {
        id: 5,
        jobTitle: "Content Writer",
        companyName: "WordCraft Media",
        discretion: "contract",
        jobDescription: "Produce engaging blog posts, articles, and marketing copy for digital platforms.",
        location: "Remote"
    },
    {
        id: 6,
        jobTitle: "Mobile App Developer",
        companyName: "AppNest Technologies",
        discretion: "fulltime",
        jobDescription: "Develop and maintain cross-platform mobile applications using React Native.",
        location: "Kisumu, Kenya"
    },
    {
        id: 7,
        jobTitle: "UI/UX Designer",
        companyName: "Creative Minds Co.",
        discretion: "fulltime",
        jobDescription: "Design intuitive user experiences and interactive prototypes for web and mobile products.",
        location: "Nairobi, Kenya"
    },
    {
        id: 8,
        jobTitle: "DevOps Engineer",
        companyName: "CloudWorks",
        discretion: "fulltime",
        jobDescription: "Manage CI/CD pipelines, automate infrastructure, and ensure system reliability on cloud platforms.",
        location: "Remote"
    },
    {
        id: 9,
        jobTitle: "Marketing Coordinator",
        companyName: "BrandBoost",
        discretion: "parttime",
        jobDescription: "Assist in planning and executing marketing campaigns across digital and traditional channels.",
        location: "Nairobi, Kenya"
    },
    {
        id: 10,
        jobTitle: "Customer Support Specialist",
        companyName: "HelpDesk Solutions",
        discretion: "contract",
        jobDescription: "Provide timely and professional support to customers via chat, email, and phone.",
        location: "Nakuru, Kenya"
    },
    {
        id: 11,
        jobTitle: "Product Manager",
        companyName: "Nova Systems",
        discretion: "fulltime",
        jobDescription: "Lead product strategy, roadmap planning, and cross-functional collaboration to deliver key features.",
        location: "Nairobi, Kenya"
    },
    {
        id: 12,
        jobTitle: "QA Tester",
        companyName: "BugFree Technologies",
        discretion: "parttime",
        jobDescription: "Perform manual and automated testing to ensure software quality before release.",
        location: "Remote"
    },
    {
        id: 13,
        jobTitle: "HR Officer",
        companyName: "PeopleFirst Ltd.",
        discretion: "fulltime",
        jobDescription: "Manage recruitment, onboarding, and employee relations processes within the organization.",
        location: "Eldoret, Kenya"
    },
    {
        id: 14,
        jobTitle: "Sales Executive",
        companyName: "MarketPro Africa",
        discretion: "contract",
        jobDescription: "Drive new business opportunities and maintain relationships with existing clients.",
        location: "Nairobi, Kenya"
    },
    {
        id: 15,
        jobTitle: "Machine Learning Engineer",
        companyName: "AI Frontier",
        discretion: "fulltime",
        jobDescription: "Build and deploy machine learning models to solve real-world business problems.",
        location: "Remote"
    },
    {
    id: 16,
    jobTitle: "Business Analyst",
    companyName: "Vertex Consulting",
    discretion: "fulltime",
    jobDescription: "Gather and analyze business requirements to recommend process improvements and system solutions.",
    location: "Nairobi, Kenya"
}
]);
    console.log(jobs);
    return ( 
        <div>
            <div className="container my-2">
                <h4 className="text-center">
                    Latest <span className="border-bottom border-3 border-primary p-1">Job</span> Vacancies
                </h4>
                <p className="text-muted text-center">
                    We have a variety of job opportunities you can choose from, click on one to apply.
                </p>
                <JobCards allJobs={jobs}/>
            </div>
        </div>
     );
}
 
export default JobSection;