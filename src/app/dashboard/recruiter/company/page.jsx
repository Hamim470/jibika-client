import { getUserSession } from "@/lib/core/session";
import CompanyProfile from "./CompanyProfile";
import { getRecruiterCompany } from "@/lib/api/companies";

const CompanyPage = async() => {
  const user= await getUserSession();
  console.log("-->",user)
  const company=await getRecruiterCompany(user.id);
  console.log("------>",company);
  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;