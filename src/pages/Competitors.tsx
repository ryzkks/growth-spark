import { Users, TrendingUp, Eye, Heart } from "lucide-react";

const competitors = [
  { name: "CreatorPro", handle: "@creatorpro", followers: "1.2M", engagement: "5.4%", avgViews: "250K", niche: "Tech Reviews" },
  { name: "ViralVicky", handle: "@viralvicky", followers: "890K", engagement: "8.2%", avgViews: "500K", niche: "Lifestyle" },
  { name: "ContentKing", handle: "@contentking", followers: "650K", engagement: "6.7%", avgViews: "180K", niche: "Education" },
  { name: "TrendSettr", handle: "@trendsettr", followers: "450K", engagement: "9.1%", avgViews: "320K", niche: "Fashion" },
];

export default function Competitors() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">Competitors</h1>
        <p className="text-muted-foreground">Analyze competitor strategies and find opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitors.map((c) => (
          <div key={c.handle} className="glass-card rounded-2xl p-6 hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-display">
                {c.name[0]}
              </div>
              <div>
                <h3 className="font-display font-semibold">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.handle} · {c.niche}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Followers", value: c.followers, icon: Users },
                { label: "Engagement", value: c.engagement, icon: Heart },
                { label: "Avg Views", value: c.avgViews, icon: Eye },
                { label: "Trend", value: "↑ Growing", icon: TrendingUp },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-secondary/20 rounded-xl p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="w-3 h-3 text-primary" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
