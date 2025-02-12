import AuthLayout from "@/components/layout/auth-layout";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout title="Log in to MelodyVerse">
      <LoginForm />
    </AuthLayout>
  );
}
