import { useInsertGroupMutation } from '@/generated/graphql';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import useUniqueId from '~/hooks/useUniqueId';
import Presenter from './Presenter';

const CreateGroupFormDialog = NiceModal.create(() => {
  const formId = useUniqueId();
  const modal = useModal();

  const [, doInsert] = useInsertGroupMutation();

  const handleClose = () => {
    modal.hide();
  };

  const handleSubmit = (...e) => {
    console.log(e)
  };

  return (
    <Presenter id={formId} onClose={handleClose} onSubmit={handleSubmit} />
  );
});

export default CreateGroupFormDialog;
