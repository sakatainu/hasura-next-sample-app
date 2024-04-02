import { Maybe } from '@sample/components/generated/graphql';
import {
  Box,
  Divider,
  FormControl,
  FormControlProps,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, FormikProps, FormikConfig } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { usePrevious } from 'react-use';
import DatePicker from '~/components/ui/DatePicker';
import ElementControl from '~/components/ui/ElementControl';
import GroupTypeSelector from '~/components/ui/GroupTypeSelector';
import PlanTypeSelector from '~/components/ui/PlanTypeSelector';
import { AllowGroupFn, useGroupAuthUtils } from '~/hooks/authUtils';
import permission from './permission';

export { default as permission } from './permission';

export type EditGroupFormDefaultValue = {
  id?: string;
  name?: Maybe<string>;
  groupTypeAssignment?: Maybe<{
    groupType?: Maybe<{
      code?: string;
    }>;
  }>;
  contract?: Maybe<{
    plan?: Maybe<{
      code?: string;
    }>;
    maxUsers?: number;
    startAt?: string;
    expireAt?: string;
  }>;
  groupStockIssue?: Maybe<{
    stockIssue?: Maybe<{
      code: string;
    }>;
  }>;
  groupSettlementDate?: Maybe<{
    month: number | '';
    day: number | '';
  }>;
  groupContent?: Maybe<{
    memo: string;
  }>;
};

export type EditMode = 'create' | 'edit' | 'readonly';

export type EditGroupFormProps = Omit<
  FormControlProps<'form'>,
  'defaultValue' | 'onSubmit'
> & {
  formikProps: FormikProps<EditGroupFormDefaultValue>;
  editMode: EditMode;
  role?: string;
  defaultValue?: EditGroupFormDefaultValue | null;
  onSubmit: FormikConfig<EditGroupFormDefaultValue>['onSubmit'];
};

const createDefaultValue = (
  value: EditGroupFormDefaultValue | null | undefined
): EditGroupFormDefaultValue => ({
  id: value?.id ?? '',
  name: value?.name ?? '',
  groupTypeAssignment: {
    groupType: {
      code: value?.groupTypeAssignment?.groupType?.code ?? '',
    },
  },
  contract: {
    plan: {
      code: value?.contract?.plan?.code ?? '',
    },
    maxUsers: value?.contract?.maxUsers ?? 3,
    startAt: value?.contract?.startAt ?? '',
    expireAt: value?.contract?.expireAt ?? '',
  },
  groupStockIssue: {
    stockIssue: {
      code: value?.groupStockIssue?.stockIssue?.code ?? '',
    },
  },
  groupSettlementDate: {
    month: value?.groupSettlementDate?.month ?? '',
    day: value?.groupSettlementDate?.day ?? '',
  },
  groupContent: {
    memo: value?.groupContent?.memo ?? '',
  },
});

const EditGroupFormFields = ({
  formikProps: { values, ...formik },
  editMode,
  role,
  defaultValue,
  onSubmit,
  ...formProps
}: EditGroupFormProps) => {
  const { allow: allowGroup, GroupPermission } = useGroupAuthUtils(role);

  const allow = useCallback<AllowGroupFn>(
    (args) => {
      if (editMode === 'readonly') return false;
      if (editMode === 'create') return true;
      return allowGroup(args);
    },
    [allowGroup, editMode]
  );

  const previousValues = usePrevious(values);

  const [fieldControl, setFieldControl] = useState({
    showStockIssue: values.contract?.plan?.code !== 'ir-consultant',
  });

  useEffect(() => {
    if (previousValues?.contract?.plan?.code === values.contract?.plan?.code)
      return;

    const currentPlanCode = values.contract?.plan?.code;
    if (currentPlanCode === 'ir-consultant') {
      if (values.groupStockIssue) {
        (async () => {
          await formik.setValues((prev) => ({
            ...prev,
            groupStockIssue: undefined,
            groupSettlementDate: undefined,
          }));
        })();
      }
    } else if (!values.groupStockIssue) {
      (async () => {
        await formik.setValues((prev) => ({
          ...prev,
          groupStockIssue: {
            stockIssue: { code: '' },
          },
          groupSettlementDate: {
            month: '',
            day: '',
          },
        }));
      })();
    }

    setFieldControl((prev) => ({
      ...prev,
      showStockIssue: values.contract?.plan?.code !== 'ir-consultant',
    }));
  }, [
    formik,
    previousValues?.contract?.plan?.code,
    values.contract?.plan?.code,
    values.groupStockIssue,
  ]);

  return (
    <FormControl
      component="form"
      fullWidth
      sx={{ display: 'flex', gap: 4 }}
      variant="filled"
      {...formProps}
      onSubmit={formik.handleSubmit}
    >
      <Box>
        <Typography component="h2" variant="h5" mb={1}>
          アカウント情報
        </Typography>
        <Divider />
      </Box>
      <input type="hidden" name="id" defaultValue={values?.id ?? ''} />
      <GroupPermission allows={permission.groupName.visible}>
        <TextField
          name="name"
          type="name"
          label="アカウント名"
          autoFocus
          required
          autoComplete="off"
          value={values?.name}
          inputProps={{
            readOnly: !allow(permission.groupName.edit),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </GroupPermission>
      <GroupPermission allows={permission.groupType.visible}>
        <GroupTypeSelector
          name="groupTypeAssignment.groupType.code"
          required
          readOnly={!allow(permission.groupType.edit)}
          value={values?.groupTypeAssignment?.groupType?.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </GroupPermission>
      <Box>
        <Typography component="h2" variant="h5" mb={1}>
          契約情報
        </Typography>
        <Divider />
      </Box>
      {editMode !== 'create' && !defaultValue?.contract ? (
        <Typography>有効な契約が存在しません。</Typography>
      ) : (
        <>
          <GroupPermission allows={permission.plan.visible}>
            <PlanTypeSelector
              name="contract.plan.code"
              required
              readOnly={!allow(permission.plan.edit)}
              value={values?.contract?.plan?.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </GroupPermission>
          <GroupPermission allows={permission.maxUsers.visible}>
            <TextField
              name="contract.maxUsers"
              type="number"
              label="ユーザー数（上限）"
              placeholder="ユーザー数（上限）"
              required
              inputProps={{
                min: 1,
                max: 100,
                readOnly: !allow(permission.maxUsers.edit),
                onWheel: (e) => e.currentTarget.blur(),
              }}
              value={values?.contract?.maxUsers}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </GroupPermission>
          <GroupPermission allows={permission.startAt.visible}>
            <DatePicker
              label="利用開始日"
              slotProps={{
                textField: {
                  name: 'contract.startAt',
                  required: true,
                },
              }}
              readOnly={!allow(permission.startAt.edit)}
              timeSetOf="start"
              value={values?.contract?.startAt}
              onChange={({ payload }) => {
                formik.handleChange('contract.startAt')(
                  payload?.date?.toISOString() || ''
                );
              }}
            />
          </GroupPermission>
          <GroupPermission allows={permission.expireAt.visible}>
            <DatePicker
              label="利用停止日"
              slotProps={{
                textField: {
                  name: 'contract.expireAt',
                  required: true,
                },
              }}
              readOnly={!allow(permission.expireAt.edit)}
              timeSetOf="end"
              value={values?.contract?.expireAt}
              onChange={({ payload }) => {
                formik.handleChange('contract.expireAt')(
                  payload?.date?.toISOString() || ''
                );
              }}
            />
          </GroupPermission>
        </>
      )}

      <ElementControl hide={!fieldControl.showStockIssue}>
        <Box>
          <Typography component="h2" variant="h5" mb={1}>
            銘柄情報
          </Typography>
          <Divider />
        </Box>
        <GroupPermission allows={permission.stockIssueCode.visible}>
          <TextField
            name="groupStockIssue.stockIssue.code"
            label="銘柄コード"
            required
            value={values?.groupStockIssue?.stockIssue?.code}
            inputProps={{
              readOnly: !allow(permission.stockIssueCode.edit),
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </GroupPermission>
        <GroupPermission allows={permission.settlement.visible}>
          <Box>
            <Typography variant="body2" mb={2}>
              決算日
            </Typography>
            <FormControl
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 2,
                '& .MuiTextField-root': {
                  flexGrow: 1,
                },
              }}
              fullWidth
            >
              <TextField
                name="groupSettlementDate.month"
                type="number"
                label="月"
                required
                inputProps={{
                  min: 1,
                  max: 12,
                  readOnly: !allow(permission.settlement.edit),
                  onWheel: (e) => e.currentTarget.blur(),
                }}
                value={values?.groupSettlementDate?.month}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                name="groupSettlementDate.day"
                type="number"
                label="日"
                required
                inputProps={{
                  min: 1,
                  max: 31,
                  readOnly: !allow(permission.settlement.edit),
                  onWheel: (e) => e.currentTarget.blur(),
                }}
                value={values?.groupSettlementDate?.day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
          </Box>
        </GroupPermission>
      </ElementControl>
      <GroupPermission allows={permission.memo.visible}>
        <Box>
          <Typography component="h2" variant="h5" mb={1}>
            その他
          </Typography>
          <Divider />
        </Box>
        <TextField
          name="groupContent.memo"
          label="備考"
          multiline
          rows="4"
          value={values?.groupContent?.memo}
          inputProps={{
            readOnly: !allow(permission.memo.edit),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </GroupPermission>
    </FormControl>
  );
};

const EditGroupForm = ({
  defaultValue,
  onSubmit,
  ...rest
}: Omit<EditGroupFormProps, 'formikProps'>) => (
  <Formik initialValues={createDefaultValue(defaultValue)} onSubmit={onSubmit}>
    {(formikProps) => (
      <EditGroupFormFields
        {...rest}
        formikProps={formikProps}
        defaultValue={defaultValue}
        onSubmit={onSubmit}
      />
    )}
  </Formik>
);

export default EditGroupForm;
