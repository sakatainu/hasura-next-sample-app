import {
  Button,
  FormControl,
  FormLabel as MuiFormLabel,
  Stack,
  TextField,
  Typography,
  FormLabelProps,
  FormHelperText,
  Autocomplete,
  FilterOptionsState,
  Box,
  ListItem,
  InputAdornment,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import Row from '~/components/ui/Row';
import { LoadingButton } from '@mui/lab';
import DialogTemplate, {
  DialogTemplateProps,
} from '~/components/ui/DialogTemplate';
import { Groups_Insert_Input } from '@/generated/graphql';

export type PresenterProps = Omit<
  DialogTemplateProps,
  'onClose' | 'onSubmit' | 'defaultValue'
> & {
  id?: string;
  loading?: boolean;
  onSubmit?: () => void;
  onClose?: (
    event: React.MouseEvent,
    reason: 'cancel' | 'backdropClick' | 'escapeKeyDown'
  ) => void;
};

const Presenter = ({
  loading = false,
  id,
  onClose,
  onSubmit,
  ...rest
}: PresenterProps): JSX.Element => {
  const { register, control, formState, handleSubmit, watch } =
    useForm<Groups_Insert_Input>({
      defaultValues: {},
    });

  console.log(formState);

  return (
    <DialogTemplate
      {...rest}
      id={id}
      title="新規作成"
      fullWidth
      maxWidth="sm"
      actions={[
        <Button
          key="1"
          disabled={loading}
          onClick={(e) => onClose?.(e, 'cancel')}
        >
          キャンセル
        </Button>,
        <LoadingButton
          key="2"
          type="submit"
          form={id}
          variant="contained"
          loading={loading}
        >
          <Box width={80}>保存</Box>
        </LoadingButton>,
      ]}
    >
      <FormControl
        component="form"
        id={id}
        fullWidth
        sx={{ display: 'flex', gap: 4 }}
        variant="filled"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row sx={{ justifyContent: 'center' }}>
          <TextField
            label="Outlined"
            variant="outlined"
            fullWidth
          {...register('name')}
          />
        </Row>
      </FormControl>
    </DialogTemplate>
  );
};

export default Presenter;
