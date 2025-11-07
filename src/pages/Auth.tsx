import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        window.location.assign('/');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.assign('/');
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast({ title: 'Sign in failed', description: error.message });
  };

  const signUp = async () => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    if (error) toast({ title: 'Sign up failed', description: error.message });
    else toast({ title: 'Check your email', description: 'Confirm your address to finish signing up.' });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') await signIn(); else await signUp();
  };

  return (
    <main className="container py-24">
      <Helmet>
        <title>Login or Sign Up | Regis</title>
        <meta name="description" content="Login or create an account to join the Regis waitlist and access features." />
        <link rel="canonical" href={`${window.location.origin}/auth`} />
      </Helmet>

      <section className="max-w-sm mx-auto glass p-6 rounded-lg">
        <h1 className="font-display text-3xl mb-4">{mode === 'signin' ? 'Login' : 'Create account'}</h1>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit">{mode === 'signin' ? 'Login' : 'Sign Up'}</Button>
        </form>
        <div className="mt-4 text-sm text-muted-foreground">
          {mode === 'signin' ? (
            <button className="underline" onClick={() => setMode('signup')}>Need an account? Sign up</button>
          ) : (
            <button className="underline" onClick={() => setMode('signin')}>Already have an account? Login</button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Auth;
