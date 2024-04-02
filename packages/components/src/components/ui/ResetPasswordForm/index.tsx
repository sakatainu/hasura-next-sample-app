import { Button, Stack } from '@mui/material';
import { useRef } from 'react';
import EmailField from '~/components/ui/FormFields/Email';

export type FormValue = {
  email: string;
};

export type ResetPasswordProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, value: FormValue) => void;
};

const RestPasswordForm = ({ onSubmit }: ResetPasswordProps) => {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = emailRef.current?.value || '';

    onSubmit?.(e, { email });
  };

  return (
    <Stack component="form" onSubmit={handleSubmit}>
      <EmailField
        inputRef={emailRef}
        name="email"
        label="メールアドレス"
        autoFocus
        helperText="指定したメールにパスワード再設定ページへのURLを送信します。"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        送信
      </Button>
    </Stack>
  );
};

export default RestPasswordForm;
