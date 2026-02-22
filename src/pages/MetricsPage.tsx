import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Eye, Heart, Users, Link2, CheckCircle2, ExternalLink } from "lucide-react";

interface SocialAccount {
  id: string;
  platform: string;
  icon: string;
  color: string;
  connected: boolean;
  username?: string;
  metrics?: {
    followers: number;
    engagement: number;
    views: number;
    growth: number;
  };
}

const defaultAccounts: SocialAccount[] = [
  {
    id: "tiktok", platform: "TikTok", icon: "🎵", color: "hsl(340 80% 55%)",
    connected: false, metrics: { followers: 0, engagement: 0, views: 0, growth: 0 },
  },
  {
    id: "instagram", platform: "Instagram", icon: "📸", color: "hsl(330 70% 50%)",
    connected: false, metrics: { followers: 0, engagement: 0, views: 0, growth: 0 },
  },
  {
    id: "youtube", platform: "YouTube", icon: "🎬", color: "hsl(0 72% 50%)",
    connected: false, metrics: { followers: 0, engagement: 0, views: 0, growth: 0 },
  },
  {
    id: "twitter", platform: "X / Twitter", icon: "𝕏", color: "hsl(200 10% 40%)",
    connected: false, metrics: { followers: 0, engagement: 0, views: 0, growth: 0 },
  },
];

const mockMetrics: Record<string, SocialAccount["metrics"]> = {
  tiktok: { followers: 45200, engagement: 7.8, views: 1250000, growth: 12.5 },
  instagram: { followers: 23800, engagement: 4.2, views: 320000, growth: 8.3 },
  youtube: { followers: 12400, engagement: 6.1, views: 890000, growth: 15.2 },
  twitter: { followers: 8900, engagement: 2.9, views: 145000, growth: 5.7 },
};

export default function MetricsPage() {
  const { t } = useLocale();
  const [accounts, setAccounts] = useState<SocialAccount[]>(defaultAccounts);

  const handleConnect = (accountId: string) => {
    setAccounts(accounts.map((acc) => {
      if (acc.id === accountId) {
        return {
          ...acc,
          connected: true,
          username: `@myalgorithm_${acc.id}`,
          metrics: mockMetrics[acc.id],
        };
      }
      return acc;
    }));
  };

  const handleDisconnect = (accountId: string) => {
    setAccounts(accounts.map((acc) => {
      if (acc.id === accountId) {
        return { ...acc, connected: false, username: undefined, metrics: { followers: 0, engagement: 0, views: 0, growth: 0 } };
      }
      return acc;
    }));
  };

  const connectedAccounts = accounts.filter((a) => a.connected);
  const totalFollowers = connectedAccounts.reduce((sum, a) => sum + (a.metrics?.followers || 0), 0);
  const avgEngagement = connectedAccounts.length
    ? (connectedAccounts.reduce((sum, a) => sum + (a.metrics?.engagement || 0), 0) / connectedAccounts.length).toFixed(1)
    : "0";
  const totalViews = connectedAccounts.reduce((sum, a) => sum + (a.metrics?.views || 0), 0);
  const avgGrowth = connectedAccounts.length
    ? (connectedAccounts.reduce((sum, a) => sum + (a.metrics?.growth || 0), 0) / connectedAccounts.length).toFixed(1)
    : "0";

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">{t("metrics.title")}</h1>
        <p className="text-muted-foreground">{t("metrics.desc")}</p>
      </div>

      {/* Aggregate Metrics */}
      {connectedAccounts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: t("metrics.followers"), value: formatNumber(totalFollowers), icon: Users, change: `+${avgGrowth}%` },
            { label: t("metrics.engagement"), value: `${avgEngagement}%`, icon: Heart, change: "+2.1%" },
            { label: t("metrics.views"), value: formatNumber(totalViews), icon: Eye, change: "+18%" },
            { label: t("metrics.growth"), value: `${avgGrowth}%`, icon: TrendingUp, change: "↑ trending" },
          ].map(({ label, value, icon: Icon, change }) => (
            <div key={label} className="glass-card rounded-2xl p-5 group hover:-translate-y-0.5 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-3xl font-bold font-display text-primary">{value}</p>
              <p className="text-xs text-accent mt-1">{change}</p>
            </div>
          ))}
        </div>
      )}

      {/* Social Accounts */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-semibold flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" />
          Social Accounts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => (
            <div key={account.id} className={`glass-card rounded-2xl p-6 transition-all hover:-translate-y-0.5 ${account.connected ? "neon-border" : ""}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${account.color}15` }}>
                    {account.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{account.platform}</h3>
                    {account.connected && (
                      <p className="text-xs text-primary flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {account.username}
                      </p>
                    )}
                  </div>
                </div>
                {account.connected ? (
                  <Button onClick={() => handleDisconnect(account.id)} variant="outline" size="sm" className="rounded-xl border-border text-muted-foreground text-xs">
                    Disconnect
                  </Button>
                ) : (
                  <Button onClick={() => handleConnect(account.id)} size="sm"
                    className="rounded-xl bg-primary text-primary-foreground text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" /> {t("metrics.connect")}
                  </Button>
                )}
              </div>

              {account.connected && account.metrics && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { label: t("metrics.followers"), value: formatNumber(account.metrics.followers) },
                    { label: t("metrics.engagement"), value: `${account.metrics.engagement}%` },
                    { label: t("metrics.views"), value: formatNumber(account.metrics.views) },
                    { label: t("metrics.growth"), value: `+${account.metrics.growth}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-secondary/20 rounded-xl p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                      <p className="text-lg font-bold font-display text-primary mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {!account.connected && (
                <div className="bg-secondary/10 rounded-xl p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Connect to view metrics</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart Mock */}
      {connectedAccounts.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Performance Overview (Last 30 days)
          </h2>
          <div className="h-48 flex items-end gap-1 px-2">
            {Array.from({ length: 30 }, (_, i) => {
              const height = 30 + Math.random() * 60 + (i / 30) * 10;
              return (
                <div key={i} className="flex-1 group relative">
                  <div className="bg-gradient-to-t from-primary/20 to-primary/60 rounded-sm transition-all group-hover:from-primary/30 group-hover:to-primary/80"
                    style={{ height: `${height}%` }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground px-2">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      )}
    </div>
  );
}
