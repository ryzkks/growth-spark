import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale, availableLanguages, availableCurrencies } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles, TrendingUp, Target, Users, ArrowRight, Check,
  Play, Zap, Crown, Menu, X, Star, Globe,
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const { t, formatPrice, language, setLanguage, currency, setCurrency } = useLocale();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [showLocale, setShowLocale] = useState(false);

  const handleCTA = () => navigate(user ? "/dashboard" : "/signup");

  const getPrice = (monthly: number) => {
    if (monthly === 0) return t("pricing.free");
    const price = annual ? Math.round(monthly * 12 * 0.8) : monthly;
    return formatPrice(price);
  };

  const getPeriod = () => annual ? t("pricing.yr") : t("pricing.mo");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span className="font-display text-xl font-bold">MyAlgorithm</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.features")}</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.pricing")}</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.faq")}</a>

            {/* Locale selector */}
            <div className="relative">
              <button onClick={() => setShowLocale(!showLocale)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
              {showLocale && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl p-3 space-y-3 z-50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium">Language</p>
                    {availableLanguages.map((l) => (
                      <button key={l.code} onClick={() => { setLanguage(l.code); }}
                        className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${language === l.code ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-border pt-2">
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium">Currency</p>
                    <div className="grid grid-cols-2 gap-1">
                      {availableCurrencies.map((c) => (
                        <button key={c.code} onClick={() => { setCurrency(c.code); }}
                          className={`text-xs px-2 py-1.5 rounded-lg transition-colors ${currency === c.code ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}>
                          {c.symbol} {c.code}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <Link to="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-9 px-5 shadow-[0_0_15px_hsl(187_88%_43%/0.3)]">
                  {t("nav.dashboard")}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm text-secondary-foreground hover:text-foreground transition-colors">{t("nav.login")}</Link>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-9 px-5 shadow-[0_0_15px_hsl(187_88%_43%/0.3)]">
                    {t("nav.getStarted")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-muted-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden glass border-t border-border/30 p-4 space-y-3">
            <a href="#features" className="block text-sm text-secondary-foreground py-2" onClick={() => setMobileMenu(false)}>{t("nav.features")}</a>
            <a href="#pricing" className="block text-sm text-secondary-foreground py-2" onClick={() => setMobileMenu(false)}>{t("nav.pricing")}</a>
            <a href="#faq" className="block text-sm text-secondary-foreground py-2" onClick={() => setMobileMenu(false)}>{t("nav.faq")}</a>
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1"><Button variant="outline" className="w-full rounded-xl border-border text-foreground">{t("nav.login")}</Button></Link>
              <Link to="/signup" className="flex-1"><Button className="w-full rounded-xl bg-primary text-primary-foreground font-semibold">{t("nav.getStarted")}</Button></Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 hero-gradient grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6 animate-fade-up">
              <Sparkles className="w-3.5 h-3.5" /> {t("hero.badge")}
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
              {t("hero.title1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent neon-text">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl animate-fade-up" style={{ animationDelay: "200ms" }}>
              {t("hero.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Button onClick={handleCTA}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8 rounded-xl text-base shadow-[0_0_20px_hsl(187_88%_43%/0.4)] transition-all hover:shadow-[0_0_30px_hsl(187_88%_43%/0.5)]">
                {t("hero.cta")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href="#how-it-works">
                <Button variant="outline"
                  className="border-border text-foreground hover:bg-secondary/50 h-12 px-8 rounded-xl text-base">
                  <Play className="w-4 h-4 mr-2" /> {t("hero.secondary")}
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6 animate-fade-up" style={{ animationDelay: "400ms" }}>
              {t("hero.trust")} <span className="text-secondary-foreground font-medium">10,000+</span> {t("hero.trustEnd")}
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 lg:mt-20 animate-fade-up" style={{ animationDelay: "500ms" }}>
            <div className="glass-card rounded-2xl p-1 neon-border max-w-4xl">
              <div className="bg-card rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(38_92%_50%/0.6)]" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(142_70%_45%/0.6)]" />
                  <span className="ml-3 text-xs text-muted-foreground">MyAlgorithm Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Viral Score", val: "92", c: "text-primary" },
                    { label: "Growth Rate", val: "+24%", c: "text-accent" },
                    { label: "Engagement", val: "8.5K", c: "text-[hsl(270_60%_60%)]" },
                  ].map((m) => (
                    <div key={m.label} className="bg-secondary/20 rounded-xl p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                      <p className={`text-xl font-bold font-display ${m.c} mt-1`}>{m.val}</p>
                    </div>
                  ))}
                </div>
                <div className="h-24 bg-secondary/10 rounded-xl flex items-end px-3 pb-3 gap-1">
                  {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 78].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary/20 to-primary/60" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-3">{t("nav.features")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Why creators choose MyAlgorithm
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Sparkles, title: "AI Content Analysis", desc: "Get instant feedback on what's holding your content back.", color: "primary" },
              { icon: TrendingUp, title: "Viral Potential Score", desc: "Know your chances of going viral before you post.", color: "accent" },
              { icon: Target, title: "Personalized Growth Plan", desc: "Exactly what to post to grow faster in your niche.", color: "primary" },
              { icon: Users, title: "Competitor Intelligence", desc: "Discover what top creators are doing differently.", color: "accent" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-7 group transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-3">How It Works</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Three steps to growth</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Connect your account", desc: "Link your TikTok, Instagram, or YouTube account in seconds." },
              { step: "02", title: "Get AI-powered insights", desc: "Our AI analyzes your content, audience, and competitors." },
              { step: "03", title: "Grow with data", desc: "Follow personalized strategies and watch your metrics climb." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative text-center group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-all">
                  <span className="font-display text-lg font-bold text-primary">{step}</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-3">{t("nav.pricing")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("pricing.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("pricing.subtitle")}</p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>{t("pricing.monthly")}</span>
              <button onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${annual ? "bg-primary" : "bg-secondary"}`}>
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-foreground transition-transform ${annual ? "left-[30px]" : "left-0.5"}`} />
              </button>
              <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>{t("pricing.annual")}</span>
              {annual && <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{t("pricing.save")}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Free", price: 0, desc: "Get started with basic content analysis", icon: Zap, features: ["3 AI Analyses / day", "Basic Growth Insights", "Dashboard Access", "Community Support"], popular: false },
              { name: "Pro", price: 19, desc: "Advanced insights and growth tools for serious creators", icon: Crown, features: ["Unlimited AI Analyses", "Advanced Insights & Hashtags", "Competitor Intelligence", "Full Analysis History", "Save Favorite Analyses", "Export Reports", "Priority Email Support"], popular: true },
              { name: "Premium", price: 49, desc: "Full analytics suite for professionals and teams", icon: Star, features: ["Everything in Pro", "Deep Performance Analysis", "AI Script Suggestions", "Smart Content Calendar", "Niche Trend Alerts", "Top Creator Comparisons", "Priority Processing & Support"], popular: false },
            ].map(({ name, price, desc, icon: Icon, features, popular }) => (
              <div key={name}
                className={`glass-card rounded-2xl p-7 relative transition-all duration-300 hover:-translate-y-1 ${popular ? "neon-border" : ""}`}>
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {t("pricing.popular")}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-bold">{name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold font-display">{getPrice(price)}</span>
                  {price > 0 && <span className="text-muted-foreground">{getPeriod()}</span>}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button onClick={handleCTA}
                  className={`w-full rounded-xl font-semibold h-11 ${
                    popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_hsl(187_88%_43%/0.3)]"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border"
                  }`}>
                  {t("pricing.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-3">Testimonials</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Creators love MyAlgorithm</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Sarah Chen", handle: "@sarahcreates", followers: "245K followers", quote: "MyAlgorithm completely changed my content strategy. My engagement rate went from 2% to 8% in just two months.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
              { name: "Marcus Johnson", handle: "@marcusj", followers: "180K followers", quote: "The viral score feature is incredibly accurate. I've had 3 videos go viral since I started using the insights.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
              { name: "Priya Sharma", handle: "@priyatalks", followers: "520K followers", quote: "The competitor analysis alone is worth the subscription. I can see exactly what's working in my niche.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
            ].map(({ name, handle, followers, quote, img }) => (
              <div key={name} className="glass-card rounded-2xl p-6">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-[hsl(38_92%_50%)] fill-[hsl(38_92%_50%)]" />
                  ))}
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-5">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={img} alt={name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{handle} · {followers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-3">{t("nav.faq")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: "How does the AI analyze my content?", a: "Our AI uses advanced NLP and computer vision to analyze your content across hook quality, pacing, hashtag strategy, caption effectiveness, and more." },
              { q: "Which platforms are supported?", a: "MyAlgorithm currently supports TikTok, Instagram, and YouTube." },
              { q: "Can I cancel anytime?", a: "Yes, cancel anytime. No long-term contracts or cancellation fees." },
              { q: "Is my data secure?", a: "We use enterprise-grade encryption and never store your social media passwords." },
              { q: "Do I need a large following?", a: "Not at all! MyAlgorithm helps creators at every stage, from 100 to 100,000+ followers." },
            ].map(({ q, a }, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass-card rounded-xl border-0 px-6">
                <AccordionTrigger className="text-sm font-medium hover:text-primary hover:no-underline py-4">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">Ready to grow faster?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Join 10,000+ creators already using MyAlgorithm.</p>
          <Button onClick={handleCTA}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8 rounded-xl text-base shadow-[0_0_20px_hsl(187_88%_43%/0.4)]">
            {t("hero.cta")} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
              </div>
              <span className="font-display text-lg font-bold">MyAlgorithm</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Product</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">{t("nav.pricing")}</a>
              <span className="cursor-default">Privacy Policy</span>
              <span className="cursor-default">Terms</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} MyAlgorithm. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
