import { GroupRole } from '~/hooks/model/useGroup';

const permission: Record<
  string,
  {
    edit: GroupRole[];
    visible: GroupRole[];
  }
> = {
  groupName: {
    edit: ['staff'],
    visible: ['staff', 'member', 'owner'],
  },
  groupType: {
    edit: ['staff'],
    visible: ['staff', 'member', 'owner'],
  },
  plan: {
    edit: ['staff'],
    visible: ['staff', 'member', 'owner'],
  },
  maxUsers: {
    edit: ['staff'],
    visible: ['staff', 'member', 'owner'],
  },
  startAt: {
    edit: ['staff'],
    visible: ['staff', 'member', 'owner'],
  },
  expireAt: {
    edit: ['staff'],
    visible: ['staff', 'member', 'owner'],
  },
  stockIssueCode: {
    edit: ['staff'],
    visible: ['staff', 'member', 'owner'],
  },
  settlement: {
    edit: ['staff', 'owner'],
    visible: ['staff', 'member', 'owner'],
  },
  memo: {
    edit: ['staff'],
    visible: ['staff'],
  },
};

export default permission;
