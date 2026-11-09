import { getRecruiterCompany } from '@/lib/api/companies';
import PostJobForm from './PostJobForm';
import { getUserSession } from '@/lib/core/session';

const PostJobPage = async() => {
      const user= await getUserSession();
      console.log("-------->",user);
      const company=await getRecruiterCompany(user?.id);
      console.log("-------->>>>>>",company);
    return (
        <div>
            <PostJobForm recruiter={user} recruiterCompany={company} />
        </div>
    );
};

export default PostJobPage;