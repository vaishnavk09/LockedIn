import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

export function SignInPage() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex items-center justify-center pt-24 relative z-10 pointer-events-auto px-6">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" appearance={{
                elements: {
                    card: 'bg-lockedin-surface border border-white/10 shadow-2xl backdrop-blur-3xl',
                    headerTitle: 'text-white font-sans text-xl',
                    headerSubtitle: 'text-zinc-400 font-sans',
                    socialButtonsBlockButton: 'text-white border-white/10 hover:bg-white/5 transition-colors',
                    formFieldLabel: 'text-white font-sans',
                    formFieldInput: 'bg-black/40 border-white/10 text-white focus:border-lockedin-primary',
                    formButtonPrimary: 'bg-lockedin-primary hover:bg-emerald-400 text-black font-bold uppercase tracking-wide',
                    footerActionText: 'text-zinc-400',
                    footerActionLink: 'text-lockedin-primary hover:text-emerald-400 transition-colors',
                    dividerLine: 'bg-white/10',
                    dividerText: 'text-zinc-500'
                }
            }} />
        </motion.div>
    );
}

export function SignUpPage() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex items-center justify-center pt-24 relative z-10 pointer-events-auto px-6">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" appearance={{
                elements: {
                    card: 'bg-lockedin-surface border border-white/10 shadow-2xl backdrop-blur-3xl',
                    headerTitle: 'text-white font-sans text-xl',
                    headerSubtitle: 'text-zinc-400 font-sans',
                    socialButtonsBlockButton: 'text-white border-white/10 hover:bg-white/5 transition-colors',
                    formFieldLabel: 'text-white font-sans',
                    formFieldInput: 'bg-black/40 border-white/10 text-white focus:border-lockedin-primary',
                    formButtonPrimary: 'bg-lockedin-primary hover:bg-emerald-400 text-black font-bold uppercase tracking-wide',
                    footerActionText: 'text-zinc-400',
                    footerActionLink: 'text-lockedin-primary hover:text-emerald-400 transition-colors',
                    dividerLine: 'bg-white/10',
                    dividerText: 'text-zinc-500'
                }
            }} />
        </motion.div>
    );
}
