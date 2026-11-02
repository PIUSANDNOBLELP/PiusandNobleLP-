import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Sign in | Pius & Noble LP" };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-deep">Admin</p>
        <h1 className="font-display text-4xl font-black leading-tight">Sign in</h1>
        <p className="mt-3 text-sm text-mute">Manage team, insights and updates.</p>
        <div className="mt-10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
