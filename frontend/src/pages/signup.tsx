import AuthLayout from "@/components/layout/auth-layout";
import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthLayout title="Sign up for MelodyVerse">
      <SignupForm />
    </AuthLayout>
  );
}
