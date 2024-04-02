import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import EmailField from '~/components/ui/FormFields/Email';
import PasswordField from '~/components/ui/FormFields/Password';
import Link from '~/components/ui/Link';
import { CustomSyntheticEventHandler } from '~/utils';

export type FormValue = {
  email: string;
  userName: string;
  password: string;
};

export type SignupFormProps = {
  defaultValue?: Partial<FormValue>;
  onSubmit?: CustomSyntheticEventHandler<HTMLElement, Event, FormValue>;
};

const SignupForm = ({ defaultValue, onSubmit }: SignupFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState({
    canSubmit: false,
    isSubmitting: false,
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleChange: React.FormEventHandler<HTMLFormElement> = () => {
    const email = emailRef.current?.value;
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    confirmPasswordRef.current?.setCustomValidity('');

    setState((prev) => ({
      ...prev,
      canSubmit: Boolean(email && userName && password && confirmPassword),
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = emailRef.current?.value || '';
    const userName = userNameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';

    if (password !== confirmPassword) {
      confirmPasswordRef.current?.setCustomValidity(
        'パスワードが一致しません。'
      );
      confirmPasswordRef.current?.reportValidity();
      return;
    }

    confirmPasswordRef.current?.setCustomValidity('');

    setState((prev) => ({
      ...prev,
      isSubmitting: true,
    }));

    (async () => {
      const payload = { email, userName, password };
      await onSubmit?.({ ...e, payload });

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    })();
  };

  return (
    <Stack
      component="form"
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <EmailField
        inputRef={emailRef}
        name="email"
        label="メールアドレス"
        autoFocus
        InputProps={{
          autoComplete: 'off',
        }}
        defaultValue={defaultValue?.email}
        disabled={state.isSubmitting}
      />
      <TextField
        inputRef={userNameRef}
        name="userName"
        label="氏名"
        required
        margin="normal"
        fullWidth
        InputProps={{
          autoComplete: 'off',
        }}
        disabled={state.isSubmitting}
      />
      <PasswordField
        inputRef={passwordRef}
        name="password"
        label="パスワード"
        InputProps={{
          autoComplete: 'off',
        }}
        disabled={state.isSubmitting}
      />
      <PasswordField
        inputRef={confirmPasswordRef}
        name="confirmPassword"
        label="パスワード確認"
        InputProps={{
          autoComplete: 'off',
        }}
        disabled={state.isSubmitting}
      />
      <Typography variant="body2" sx={{ p: 1 }}>
        <span>サインアップすることにより、</span>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://lp.Sample.com/terms"
        >
          利用規約
        </Link>
        <span>と</span>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://lp.Sample.com/privacy"
        >
          プライバシーポリシー
        </Link>
        <span>に同意したことになります</span>
      </Typography>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 2 }}
        disabled={!state.canSubmit}
        loading={state.isSubmitting}
      >
        登録
      </LoadingButton>
    </Stack>
  );
};

export default SignupForm;
