"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/ui/hero-section-9";
import { MoveRight, Sparkles, BookOpen, BrainCircuit, Rocket, CheckCircle2, Users, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const heroData = {
    title: (
      <>
        Master Any Subject with <br />
        <span className="bg-gradient-to-r from-primary via-sky-600 to-indigo-600 bg-clip-text text-transparent italic drop-shadow-sm">
          AI Precision
        </span>
      </>
    ),
    subtitle: 'Veda AI is your personalized study partner, generating structured courses and smart materials from the world’s most advanced AI models.',
    actions: [
      {
        text: 'Unlock Your Path',
        onClick: () => router.push('/dashboard'),
        variant: 'default',
        className: 'bg-primary hover:bg-primary/95 shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] hover:scale-[1.03] transition-all rounded-2xl gap-3 h-16 px-10 text-xl font-bold font-bold'
      },
      {
        text: 'See the Magic',
        onClick: () => {
          const element = document.getElementById('features');
          element?.scrollIntoView({ behavior: 'smooth' });
        },
        variant: 'outline',
        className: 'h-16 px-10 text-xl font-bold rounded-2xl border-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all font-bold'
      },
    ],
    stats: [
      {
        value: '25,4K',
        label: 'Active students',
        icon: <Users className="h-5 w-5 text-muted-foreground" />,
      },
      {
        value: '1.2K',
        label: 'AI Courses',
        icon: <Briefcase className="h-5 w-5 text-muted-foreground" />,
      },
      {
        value: '98%',
        label: 'Retention',
        icon: <GraduationCap className="h-5 w-5 text-muted-foreground" />,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
      'https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900?q=80&w=2070&auto=format&fit=crop',
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black selection:bg-primary/20">
      {/* Floating Navbar */}
      <Navbar className="top-10" />
      
      <main className="overflow-hidden">
        {/* Modern Premium Hero Section Component */}
        <div className="pt-24 lg:pt-32 bg-neutral-50 dark:bg-black">
          <HeroSection
            title={heroData.title}
            subtitle={heroData.subtitle}
            actions={heroData.actions}
            stats={heroData.stats}
            images={heroData.images}
            className="pt-24 lg:pt-32"
          />
        </div>

        {/* Improved Feature Cards Section */}
        <section id="features" className="py-32 relative bg-white dark:bg-[#050505]">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mb-24">
               <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">Fast-track your <span className="text-primary italic">Success</span> with AI tools</h2>
               <p className="text-lg text-neutral-500 dark:text-neutral-400">Everything we build is designed to make learning effortless, smart and scientific.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <BrainCircuit className="w-10 h-10 text-primary" />,
                  title: "Neuro-Generated Courses",
                  desc: "Veda AI doesn't just list topics; it understands your gaps and generates structured lessons that click."
                },
                {
                  icon: <BookOpen className="w-10 h-10 text-blue-500" />,
                  title: "Semantic Chapter Notes",
                  desc: "Forget long paragraphs. Our AI distills wisdom into interactive summaries and deep-dives for every concept."
                },
                {
                  icon: <Sparkles className="w-10 h-10 text-purple-600" />,
                  title: "Learning Intelligence",
                  desc: "The more you study, the smarter your Veda becomes, tailoring difficulty and pace to your exact level."
                }
              ].map((f, i) => (
                <div key={i} className="group p-10 rounded-[2rem] border bg-neutral-50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-900 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                  <div className="mb-6 p-4 bg-white dark:bg-neutral-800 rounded-2xl border shadow-sm w-fit group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:dark:text-neutral-300 transition-colors">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-32 bg-neutral-50 dark:bg-black">
             <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-black mb-4 text-neutral-900 dark:text-neutral-50">Transparent Pricing</h2>
                <p className="text-neutral-500 mb-16">Simple plans for serious learners.</p>
                
                <div className="max-w-lg mx-auto p-12 rounded-[3rem] border-4 border-primary/20 bg-background shadow-[0_30px_70px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                     {/* Bestseller Badge */}
                     <div className="absolute top-6 right-6 px-4 py-1.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-full">Pro Choice</div>
                     
                     <h3 className="text-2xl font-bold mb-4">Standard Plan</h3>
                     <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-6xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50">$9.99</span>
                        <span className="text-neutral-400 font-bold">/mo</span>
                     </div>
                     <p className="text-neutral-500 mb-8 italic text-sm">Cancel anytime, no questions asked.</p>
                     
                     <ul className="space-y-5 mb-10 text-left">
                        {["Unlimited AI Courses", "Advanced Analytics", "PDF & Markdown Exports", "Global Knowledge Sync", "24/7 AI Tutor Support"].map((item) => (
                            <li key={item} className="flex items-center gap-3 font-semibold text-neutral-700 dark:text-neutral-300">
                                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                     </ul>
                     
                     <Button className="w-full h-14 rounded-2xl text-lg font-bold group-hover:scale-[1.02] transition-transform">Coming Soon</Button>
                </div>
             </div>
        </section>
      </main>

      <footer className="py-20 border-t dark:border-white/5 mt-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center text-neutral-400">
            <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl">V</div>
                <span className="text-2xl font-black text-neutral-900 dark:text-white">Veda AI</span>
            </div>
            <p className="max-w-md mx-auto mb-10 text-lg leading-relaxed">Pioneering the future of education with empathetic AI agents and personalized systems.</p>
            <div className="flex justify-center gap-12 font-bold text-neutral-900 dark:text-white mb-10">
                <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-primary transition-colors">Discord</Link>
            </div>
            <p className="text-sm font-semibold opacity-50 italic">© 2026 Veda AI Technologies Inc. Crafting wisdom, one byte at a time.</p>
        </div>
      </footer>
    </div>
  );
}
