import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const client = supabase as any;

interface FormData {
  email: string;
  name?: string;
  wallet_address?: string;
  github?: string;
  x_handle?: string;
  role?: string;
  marketing_opt_in?: boolean;
}

const Waitlist = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ email: "" });

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setSessionUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data }) => setSessionUserId(data.session?.user?.id ?? null));
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUserId) {
      toast({ title: "Login required", description: "Please login on the Auth page to join the waitlist." });
      return;
    }
    setLoading(true);
    const payload = { ...form, user_id: sessionUserId } as any;
    const { error } = await client
      .from("waitlist")
      .upsert(payload, { onConflict: "user_id" });

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
    } else {
      toast({ title: "You're on the list!", description: "We'll be in touch with next steps." });
    }
  };

  return (
    <main className="container py-24">
      <Helmet>
        <title>Join the Regis Waitlist</title>
        <meta name="description" content="Join the waitlist for RegisBlockchain and get early access to the Arbitrum Orbit-based L3." />
        <link rel="canonical" href={`${window.location.origin}/waitlist`} />
      </Helmet>

      <section className="max-w-xl mx-auto">
        <h1 className="font-display text-3xl mb-2">Join the Waitlist</h1>
        <p className="text-muted-foreground mb-6">Sign in, then share a few details and we’ll notify you.</p>

        {!sessionUserId ? (
          <div className="glass p-6 rounded-lg">
            <p className="mb-4">You need an account to join the waitlist.</p>
            <Button asChild variant="hero">
              <a href="/auth">Go to Auth</a>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass p-6 rounded-lg grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="wallet">Wallet Address</Label>
              <Input id="wallet" value={form.wallet_address ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, wallet_address: e.target.value }))} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" value={form.github ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="x">X (Twitter)</Label>
                <Input id="x" value={form.x_handle ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, x_handle: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Builder, Node Operator, etc." value={form.role ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
            </div>
            <div className="flex items-center gap-3">
              <input id="optin" type="checkbox" checked={!!form.marketing_opt_in}
                onChange={(e) => setForm((f) => ({ ...f, marketing_opt_in: e.target.checked }))} />
              <Label htmlFor="optin">I agree to receive occasional updates</Label>
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Join Waitlist"}</Button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default Waitlist;
