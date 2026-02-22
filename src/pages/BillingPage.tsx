import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, Crown, Zap, Star, ArrowRight } from "lucide-react";

export default function BillingPage() {
  const { user } = useAuth();
  const { t, formatPrice } = useLocale();
  const [annual, setAnnual] = useState(false);

  const plans = [
    { id: "free", name: "Free", price: 0, icon: Zap, features: ["3 AI Analyses / day", "Basic Growth Insights", "Dashboard Access", "Community Support"] },
    { id: "pro", name: "Pro", price: 19, icon: Crown, features: ["Unlimited AI Analyses", "Advanced Insights & Hashtags", "Competitor Intelligence", "Full Analysis History", "Save Favorite Analyses", "Export Reports", "Priority Email Support"], popular: true },
    { id: "premium", name: "Premium", price: 49, icon: Star, features: ["Everything in Pro", "Deep Performance Analysis", "AI Script Suggestions", "Smart Content Calendar", "Niche Trend Alerts", "Top Creator Comparisons", "Priority Processing & Support"] },
  ];

  const getPrice = (monthly: number) => {
    if (monthly === 0) return t("pricing.free");
    const price = annual ? Math.round(monthly * 12 * 0.8) : monthly;
    return formatPrice(price);
  };

  const getPeriod = () => annual ? t("pricing.yr") : t("pricing.mo");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">{t("billing.title")}</h1>
        <p className="text-muted-foreground">{t("billing.desc")}</p>
      </div>

      {/* Current Plan */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">{t("pricing.current")}</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold capitalize">
            {user?.plan || "free"}
          </span>
          {user?.plan === "free" && (
            <span className="text-sm text-muted-foreground">Upgrade to unlock all features</span>
          )}
        </div>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>{t("pricing.monthly")}</span>
        <button onClick={() => setAnnual(!annual)}
          className={`relative w-14 h-7 rounded-full transition-colors ${annual ? "bg-primary" : "bg-secondary"}`}>
          <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-foreground transition-transform ${annual ? "left-[30px]" : "left-0.5"}`} />
        </button>
        <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>{t("pricing.annual")}</span>
        {annual && <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{t("pricing.save")}</span>}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isCurrent = user?.plan === plan.id;
          const Icon = plan.icon;
          return (
            <div key={plan.id}
              className={`glass-card rounded-2xl p-6 relative transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "neon-border" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {t("pricing.popular")}
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-bold">{plan.name}</h3>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold font-display">{getPrice(plan.price)}</span>
                {plan.price > 0 && <span className="text-muted-foreground text-sm">{getPeriod()}</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <Button disabled className="w-full rounded-xl bg-secondary text-muted-foreground">{t("pricing.current")}</Button>
              ) : (
                <Button className={`w-full rounded-xl font-semibold ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_hsl(187_88%_43%/0.3)]"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border"
                }`}>
                  {t("pricing.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment History */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold mb-4">Payment History</h2>
        <p className="text-sm text-muted-foreground">No payment history yet</p>
      </div>
    </div>
  );
}
