import { contentSystemPages } from '@/components/admin/pages/content-system';
import { participantSubjectPages } from '@/components/admin/pages/participants-subjects';
import { questionResultPages } from '@/components/admin/pages/questions-results';
import type { AdminPageMap } from '@/components/admin/pages/types';

// Every admin menu page, keyed by its URL slug (see admin-nav.ts).
export const adminPages: AdminPageMap = {
    ...participantSubjectPages,
    ...questionResultPages,
    ...contentSystemPages,
};
