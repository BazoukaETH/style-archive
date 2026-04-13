import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="font-heading text-5xl font-light tracking-[0.15em] text-foreground lowercase">taqm</h1>
          <p className="text-muted-foreground font-body text-sm mt-3 tracking-wide">Your wardrobe, curated.</p>
        </div>
        <div className="w-full pb-12 space-y-4">
          <button
            onClick={() => navigate('/onboarding')}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide"
          >
            Get Started
          </button>
          <p className="text-center text-muted-foreground text-sm">
            Already have an account?{' '}
            <button onClick={() => navigate('/signin')} className="text-foreground font-medium underline underline-offset-4">Sign in</button>
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

const steps = [
  { title: 'Catalog Everything', body: 'Photograph every piece in your wardrobe. Clothes, shoes, bags, accessories — all in one place.' },
  { title: 'Tag & Organize', body: 'Generate unique tags for each item. Print at home or let us handle it for you.' },
  { title: 'Style with Experts', body: 'Connect with personal stylists who can create looks from your own wardrobe.' },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const isLast = step === 2;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col px-8 pt-16 pb-12">
        <button onClick={() => navigate('/signup')} className="self-end text-muted-foreground text-sm mb-8">Skip</button>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-48 h-48 rounded-3xl bg-card mb-12 flex items-center justify-center">
            <span className="font-heading text-6xl text-primary opacity-30">{step + 1}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl font-medium mb-4">{steps[step].title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">{steps[step].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-primary' : 'bg-border'}`} />
            ))}
          </div>
          <button
            onClick={() => isLast ? navigate('/signup') : setStep(s => s + 1)}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide"
          >
            {isLast ? 'Enter Your Closet' : 'Next'}
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col px-8 pt-16 pb-12">
        <h1 className="font-heading text-3xl font-medium mb-2">Create Account</h1>
        <p className="text-muted-foreground text-sm mb-8">Join taqm and organize your wardrobe</p>
        <div className="space-y-4 flex-1">
          <div>
            <label className="label-caps mb-1.5 block">Full Name</label>
            <input className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Sarah Ahmad" />
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Email</label>
            <input className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="sarah@email.com" type="email" />
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Password</label>
            <input className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" type="password" />
          </div>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide mt-2"
          >
            Create Account
          </button>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-xs">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <button className="w-full py-3.5 rounded-xl border border-border font-body text-sm font-medium flex items-center justify-center gap-2">
            Continue with Google
          </button>
          <button className="w-full py-3.5 rounded-xl border border-border font-body text-sm font-medium flex items-center justify-center gap-2">
            Continue with Apple
          </button>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/signin')} className="text-foreground font-medium underline underline-offset-4">Sign in</button>
        </p>
      </div>
    </PageTransition>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col px-8 pt-16 pb-12">
        <h1 className="font-heading text-3xl font-medium mb-2">Welcome Back</h1>
        <p className="text-muted-foreground text-sm mb-8">Sign in to your wardrobe</p>
        <div className="space-y-4 flex-1">
          <div>
            <label className="label-caps mb-1.5 block">Email</label>
            <input className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="sarah@email.com" type="email" />
          </div>
          <div>
            <label className="label-caps mb-1.5 block">Password</label>
            <input className="w-full px-4 py-3.5 rounded-xl bg-card border border-border text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" type="password" />
          </div>
          <button className="text-sm text-muted-foreground self-end">Forgot password?</button>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide"
          >
            Sign In
          </button>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-xs">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <button className="w-full py-3.5 rounded-xl border border-border font-body text-sm font-medium">Continue with Google</button>
          <button className="w-full py-3.5 rounded-xl border border-border font-body text-sm font-medium">Continue with Apple</button>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-6">
          New here?{' '}
          <button onClick={() => navigate('/signup')} className="text-foreground font-medium underline underline-offset-4">Create account</button>
        </p>
      </div>
    </PageTransition>
  );
};

export { Welcome, Onboarding, SignUp, SignIn };
