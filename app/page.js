"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/ui/hero-section-9";
import { Footerdemo } from "@/components/ui/footer-section";
import { CreativePricing } from "@/components/ui/creative-pricing";
import { Sparkles, BookOpen, BrainCircuit, Users, Briefcase, GraduationCap, Pencil, Star, ArrowRight, CheckCircle2, CopyPlus, Target, Plus, MessagesSquare, Heart, Globe, Lightbulb, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const PRICING_TIERS = [
  {
    name: "Student",
    icon: <Pencil className="w-6 h-6" />,
    iconColor: "text-blue-500",
    price: 0,
    description: "Free forever for casual learners",
    features: [
      "3 AI Courses / month",
      "Basic Chapter Notes",
      "Community Support",
      "PDF Exports",
    ],
  },
  {
    name: "Pro Learner",
    icon: <Star className="w-6 h-6" />,
    iconColor: "text-amber-500",
    price: 9.99,
    description: "For dedicated students",
    features: [
      "Unlimited AI Courses",
      "Advanced Analytics",
      "Smart Study Paths",
      "Priority AI Processing",
    ],
    popular: true,
  },
  {
    name: "Institution",
    icon: <Sparkles className="w-6 h-6" />,
    iconColor: "text-purple-500",
    price: 49.99,
    description: "For teams & classrooms",
    features: [
      "Everything in Pro",
      "Team Collaboration",
      "Admin Dashboard",
      "Custom AI Models",
    ],
  },
];

export default function Home() {
  const router = useRouter();

  const heroData = {
    title: (
      <>
        Master Any Subject with <br />
        <span className="bg-gradient-to-r from-blue-500 via-sky-600 to-indigo-600 bg-clip-text text-transparent italic drop-shadow-sm">
          AI Precision
        </span>
      </>
    ),
    subtitle: 'Veda AI is your personalized study partner, generating structured courses and smart materials from the world\'s most advanced AI models.',
    actions: [
      {
        text: 'Unlock Your Path',
        onClick: () => router.push('/dashboard'),
        variant: 'default',
        className: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-[4px_4px_0px_0px] shadow-neutral-900 dark:shadow-neutral-400 border-2 border-neutral-900 dark:border-neutral-300 hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all rounded-xl gap-3 h-14 px-10 text-xl'
      },
      {
        text: 'See the Magic',
        onClick: () => {
          const element = document.getElementById('features');
          element?.scrollIntoView({ behavior: 'smooth' });
        },
        variant: 'outline',
        className: 'h-14 px-10 text-xl rounded-xl border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px] shadow-neutral-900 dark:shadow-neutral-400 hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all'
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
    <div className="min-h-screen bg-neutral-50 dark:bg-black selection:bg-blue-500/20">
      {/* Navbar */}
      <Navbar />
      
      <main className="overflow-hidden">
        {/* Hero Section */}
        <div className="bg-white dark:bg-black">
          <HeroSection
            title={heroData.title}
            subtitle={heroData.subtitle}
            actions={heroData.actions}
            stats={heroData.stats}
            images={heroData.images}
            className="pt-24 lg:pt-32"
          />
        </div>

        {/* Feature Cards Section */}
        <section id="features" className="py-22 relative bg-white dark:bg-[#050505]">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mb-24">
               <div className="text-xl text-blue-500 rotate-[-1deg] mb-3">Why Veda AI?</div>
               <div className="relative">
                 <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-neutral-900 dark:text-white rotate-[-1deg]">
                   Fast-track your <span className="text-blue-500 italic">Success</span> with AI tools
                   <div className="absolute -right-10 top-0 text-amber-500 rotate-12">✨</div>
                 </h2>
                 <div className="absolute -bottom-2 left-0 w-36 h-3 bg-blue-500/20 rotate-[-1deg] rounded-full blur-sm" />
               </div>
               <p className="text-lg text-neutral-500 dark:text-neutral-400 rotate-[-1deg]">Everything we build is designed to make learning effortless, smart and scientific.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BrainCircuit className="w-8 h-8" />,
                  iconColor: "text-blue-500",
                  title: "Neuro-Generated Courses",
                  desc: "Veda AI doesn't just list topics; it understands your gaps and generates structured lessons that click."
                },
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  iconColor: "text-amber-500",
                  title: "Semantic Chapter Notes",
                  desc: "Forget long paragraphs. Our AI distills wisdom into interactive summaries and deep-dives for every concept."
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  iconColor: "text-purple-500",
                  title: "Learning Intelligence",
                  desc: "The more you study, the smarter your Veda becomes, tailoring difficulty and pace to your exact level."
                }
              ].map((f, i) => (
                <div
                  key={i}
                  className={`relative group transition-all duration-300 cursor-pointer ${
                    i === 0 ? "rotate-[-1deg]" : i === 1 ? "rotate-[1deg]" : "rotate-[-2deg]"
                  }`}
                >
                  <div className="absolute inset-0 bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 rounded-lg shadow-[4px_4px_0px_0px] shadow-neutral-900 dark:shadow-neutral-400 transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
                  <div className="relative p-8">
                    <div className={`w-12 h-12 rounded-full mb-5 flex items-center justify-center border-2 border-neutral-900 dark:border-neutral-300 ${f.iconColor}`}>
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{f.title}</h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-neutral-100 dark:bg-neutral-950 border-y-2 border-neutral-900 dark:border-neutral-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-20 mt-8">
              <div className="text-xl text-blue-500 rotate-[-1deg] mb-3">Simple Process</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white rotate-[1deg]">
                How Veda AI <span className="text-blue-500 italic">Works</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-[25%] left-[15%] w-[70%] h-1 border-t-4 border-dashed border-neutral-300 dark:border-neutral-700 -z-10" />
              {[
                { step: "01", title: "Enter Your Topic", desc: "Type in any subject, syllabus, or upload your existing class materials.", icon: <CopyPlus className="w-8 h-8 text-blue-500" /> },
                { step: "02", title: "AI Analyzes & Crafts", desc: "Our advanced models build a structured, comprehensive course in seconds.", icon: <BrainCircuit className="w-8 h-8 text-amber-500" /> },
                { step: "03", title: "Master the Content", desc: "Learn via semantic notes, take quizzes, and track your retention globally.", icon: <Target className="w-8 h-8 text-purple-500" /> },
              ].map((item, i) => (
                <div key={i} className="relative group flex flex-col items-center text-center cursor-pointer">
                  <div className="w-20 h-20 mb-6 bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:-translate-y-2 transition-transform duration-300 relative z-10">
                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full border-2 border-neutral-900 dark:border-neutral-300 flex items-center justify-center shadow-sm">
                      {item.step}
                    </span>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{item.title}</h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Pricing Section */}
        <section id="pricing" className="py-30 bg-neutral-50 dark:bg-black relative">
          <CreativePricing
            tag="Transparent Pricing"
            title="Choose Your Learning Journey"
            description="Simple plans for serious learners — cancel anytime"
            tiers={PRICING_TIERS}
          />
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white dark:bg-[#050505]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <div className="text-xl text-amber-500 rotate-[1deg] mb-3">Got Questions?</div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white rotate-[-1deg]">
                Frequently Asked <span className="text-amber-500 italic">Questions</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                { q: "Is Veda AI really free for students?", a: "Yes! Our Student tier is 100% free and gives you access to 3 full AI-generated courses per month, making it perfect for casual learners." },
                { q: "Can I upload my own PDF syllabus?", a: "Absolutely. Pro Learners and Institutions can upload PDFs, Word docs, and PowerPoints, and the AI will extract the structure and generate learning modules." },
                { q: "What models generate the courses?", a: "We use a proprietary mix of the latest foundational models (including GPT-4o and Claude 3.5 Sonnet) specifically fine-tuned for educational pedagogy." },
                { q: "How do I cancel my Pro subscription?", a: "You can cancel anytime from your dashboard billing settings with a single click. No forced phone calls or hidden menus." },
              ].map((faq, i) => (
                <div key={i} className="bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
                    <MessagesSquare className="w-6 h-6 text-blue-500 shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 pl-9">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-32 bg-neutral-100 dark:bg-neutral-950 border-y-2 border-neutral-900 dark:border-neutral-800 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="text-xl text-blue-500 rotate-[-1deg] mb-3">Who We Are</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white rotate-[1deg] mb-6">
                Built by <span className="text-blue-500 italic">Learners</span>, for Learners
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Veda AI was born from a simple frustration — traditional study materials don't adapt to you. We're a passionate team of educators, engineers, and AI researchers on a mission to make world-class learning accessible to everyone, everywhere.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
              {[
                {
                  icon: <Heart className="w-7 h-7" />,
                  iconColor: "text-rose-500",
                  title: "Student First",
                  desc: "Every feature we ship is tested against one question: does this actually help a student learn better?"
                },
                {
                  icon: <Lightbulb className="w-7 h-7" />,
                  iconColor: "text-amber-500",
                  title: "AI-Native",
                  desc: "We don't bolt AI onto old tools. Our entire platform is designed ground-up around intelligent, adaptive learning."
                },
                {
                  icon: <Globe className="w-7 h-7" />,
                  iconColor: "text-emerald-500",
                  title: "Globally Accessible",
                  desc: "Quality education shouldn't have borders. Veda AI works for learners in 120+ countries and counting."
                },
                {
                  icon: <Zap className="w-7 h-7" />,
                  iconColor: "text-purple-500",
                  title: "Always Evolving",
                  desc: "We ship weekly. New models, smarter algorithms, and fresh features — we never stop improving."
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className={`group relative cursor-pointer transition-all duration-300 ${
                    i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
                  }`}
                >
                  <div className="absolute inset-0 bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 rounded-xl shadow-[4px_4px_0px_0px] shadow-neutral-900 dark:shadow-neutral-400 transition-all duration-300 group-hover:shadow-[6px_6px_0px_0px] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
                  <div className="relative p-6">
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center border-2 border-neutral-900 dark:border-neutral-300 bg-neutral-50 dark:bg-neutral-800 ${value.iconColor}`}>
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white">{value.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Vision Statement */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 rounded-2xl p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] rotate-[0.5deg] hover:rotate-0 transition-transform duration-500">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
                  A world where every student has a personal AI tutor that understands their unique way of thinking — making knowledge gaps a thing of the past.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-24 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto bg-white dark:bg-black rounded-[2rem] border-4 border-neutral-900 dark:border-neutral-300 p-12 md:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] relative group">
              <div className="absolute -top-6 -right-6 text-6xl rotate-12 transition-transform duration-500 group-hover:rotate-45">✨</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-neutral-900 dark:text-white">Ready to ace your next exam?</h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
                Join over 25,000 students who have switched to smarter, AI-driven studying.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="h-16 px-10 rounded-xl text-xl font-bold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px] hover:-translate-y-1 hover:-translate-x-1 transition-all group/btn">
                  Sign up free
                  <ArrowRight className="w-6 h-6 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="h-16 px-10 rounded-xl text-xl font-bold border-2 border-neutral-900 dark:border-neutral-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px] hover:-translate-y-1 hover:-translate-x-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all text-neutral-900 dark:text-white">
                  View pricing
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footerdemo />
    </div>
  );
}
