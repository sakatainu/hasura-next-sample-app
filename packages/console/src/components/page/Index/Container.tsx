import { useSelectGroupsQuery } from '@/generated/graphql';
import NiceModal from '@ebay/nice-modal-react';
import CreateGroupFormDialog from '~/components/dialog/CreateGroupFormDialog';
import Presenter from './Presenter';

const Container = () => {
  const [{ fetching, data }] = useSelectGroupsQuery();

  const handleClickAdd = () => {
    NiceModal.show(CreateGroupFormDialog);
  };

  return (
    <Presenter
      loading={fetching}
      value={data?.groups || []}
      onClickAdd={handleClickAdd}
    />
  );
};

export default Container;
