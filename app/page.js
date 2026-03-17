import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { MoveRight, Sparkles, BookOpen, BrainCircuit, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <Sparkles className="w-4 h-4" />
              <span>Next Gen AI Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Master Any Subject with <br />
              <span className="text-primary italic">AI-Powered</span> Learning
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Veda AI creates personalized learning paths tailormade for you. 
              Upload documents, generate courses, and track your progress with 
              state-of-the-art AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  Get Started for Free <MoveRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                View Demo
              </Button>
            </div>

            {/* Floating Visual Elements */}
            <div className="mt-20 relative max-w-5xl mx-auto">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
              
              <div className="relative rounded-2xl border bg-card/50 backdrop-blur-sm p-4 shadow-2xl overflow-hidden group">
                  <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                      {/* Simple placeholder for dashboard preview */}
                      <div className="text-muted-foreground flex flex-col items-center gap-4 group-hover:scale-110 transition-transform duration-700">
                          <Rocket className="w-16 h-16 opacity-20" />
                          <span className="font-semibold text-lg opacity-40">Your Dashboard Preview</span>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to learn faster</h2>
              <p className="text-muted-foreground">Combining traditional wisdom with modern AI technology.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BrainCircuit className="w-8 h-8 text-primary" />,
                  title: "AI Course Generation",
                  desc: "Generate complete courses on any topic in seconds with structured chapters and sub-topics."
                },
                {
                  icon: <BookOpen className="w-8 h-8 text-primary" />,
                  title: "Smart Interactivity",
                  desc: "Interact with your courses, ask questions, and get instant AI-powered explanations."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-primary" />,
                  title: "Tailored Experience",
                  desc: "Content adapts to your skill level and learning style for maximum retention."
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="mb-4 p-3 rounded-xl bg-primary/5 inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">Veda AI</span>
            <span>© 2026 All rights reserved.</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
