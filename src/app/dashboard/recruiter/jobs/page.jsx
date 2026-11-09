import { getRecruiterCompany } from "@/lib/api/companies";
import RecruiterJobs from "./RecruiterJobs";
import { getUserSession } from "@/lib/core/session";

const RecruiterJobsPage = async() => {
      const user=await getUserSession();
    
      const company=await getRecruiterCompany(user?.id);

    return (
        <div>
            <RecruiterJobs company={company}/>
        </div>
    );
};

export default RecruiterJobsPage;