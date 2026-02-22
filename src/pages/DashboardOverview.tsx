import { Eye, TrendingUp, Heart, Sparkles, ArrowRight, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardOverview() {
  const { user } = useAuth();

  const metricCards = [
    { label: "Reach Score", value: 72, icon: Eye, suffix: "/100" },
    { label: "Growth Rate", value: 12, icon: TrendingUp, suffix: "%" },
    { label: "Engagement", value: 65, icon: Heart, suffix: "/100" },
    { label: "Content Score", value: 8, icon: Sparkles, suffix: "/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">
          Welcome back, {user?.name || "Creator"} 👋
        </h1>
        <p className="text-muted-foreground">Here's your content performance overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map(({ label, value, icon: Icon, suffix }) => (
          <div key={label} className="glass-card rounded-2xl p-5 group hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
              <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-3xl font-bold font-display text-primary">{value}<span className="text-lg text-muted-foreground">{suffix}</span></p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link to="/dashboard/analyze" className="glass-card rounded-2xl p-6 group hover:-translate-y-0.5 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Analyze Content</h2>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">Get AI-powered feedback on your latest content</p>
        </Link>

        <Link to="/dashboard/growth-plan" className="glass-card rounded-2xl p-6 group hover:-translate-y-0.5 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Growth Plan</h2>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">View and customize your weekly content strategy</p>
        </Link>

        <Link to="/dashboard/metrics" className="glass-card rounded-2xl p-6 group hover:-translate-y-0.5 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Social Metrics</h2>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">Track your TikTok, Instagram & YouTube performance</p>
        </Link>

        <Link to="/dashboard/competitors" className="glass-card rounded-2xl p-6 group hover:-translate-y-0.5 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Competitors</h2>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">Analyze competitor strategies and find opportunities</p>
        </Link>
      </div>
    </div>
  );
}
