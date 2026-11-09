import { requireRole } from '@/lib/core/session';

const SeekerLayout = async ({children}) => {
    await requireRole('seeker');
    return (
        <div>
            {children}
        </div>
    );
};

export default SeekerLayout;