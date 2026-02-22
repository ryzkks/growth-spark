import { useState } from "react";
import { Calendar, Clock, Lightbulb, TrendingUp, Sparkles, RefreshCw, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

const defaultPlan = {
  weekly_strategy: {
    monday: { type: "Educational Reel", time: "9:00 AM", tip: "Share a quick tip related to your niche" },
    tuesday: { type: "Behind the Scenes", time: "12:00 PM", tip: "Show your creative process or daily routine" },
    wednesday: { type: "Trending Audio", time: "6:00 PM", tip: "Use a trending sound with your unique twist" },
    thursday: { type: "Story Time", time: "3:00 PM", tip: "Tell an engaging personal story" },
    friday: { type: "Collaboration", time: "11:00 AM", tip: "Partner with another creator in your niche" },
    saturday: { type: "Challenge/Trend", time: "10:00 AM", tip: "Participate in a trending challenge" },
    sunday: { type: "Recap/Planning", time: "5:00 PM", tip: "Review the week and plan ahead" },
  },
  best_posting_times: [
    { day: "Weekdays", times: ["9:00 AM", "12:00 PM", "6:00 PM"] },
    { day: "Weekends", times: ["10:00 AM", "2:00 PM", "8:00 PM"] },
  ],
  recommended_topics: [
    "Growth hacks", "Content tips", "Behind the scenes", "Day in my life",
    "Tutorials", "Hot takes", "Q&A", "Trending sounds", "Niche deep-dives", "Before & after",
  ],
  content_ideas: [
    "Create a 'What I wish I knew' series about your niche",
    "Film a day-in-the-life showing your creative process",
    "React to the top trending content in your niche",
    "Share your biggest failure and what you learned",
    "Do a 'myth vs reality' about your industry",
    "Create a step-by-step tutorial for beginners",
    "Interview a fellow creator in your space",
    "Share your top tools and resources",
    "Do a '3 things to stop doing' in your niche",
  ],
};

export default function GrowthPlan() {
  const { t } = useLocale();
  const [plan, setPlan] = useState(defaultPlan);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(defaultPlan.weekly_strategy);
  const [regenerating, setRegenerating] = useState(false);

  const handleEdit = () => {
    setEditData({ ...plan.weekly_strategy });
    setEditing(true);
  };

  const handleSave = () => {
    setPlan({ ...plan, weekly_strategy: editData });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleDayChange = (day: string, field: string, value: string) => {
    setEditData({
      ...editData,
      [day]: { ...editData[day as keyof typeof editData], [field]: value },
    });
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    // Simulate AI regeneration
    setTimeout(() => {
      const newIdeas = [
        "Create a 'hot take' video about a trending topic in your niche",
        "Film a 'get ready with me' while sharing advice",
        "Do a POV video showing common mistakes beginners make",
        "Share a transformation or progress video",
        "Create a 'things that just make sense' video for your niche",
        "Film a reaction to your oldest content",
        "Share an unpopular opinion in your industry",
        "Create a 'you need to try this' recommendation video",
        "Do a duet or stitch with a viral video adding your expertise",
      ];
      setPlan({ ...plan, content_ideas: newIdeas });
      setRegenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">{t("growth.title")}</h1>
          <p className="text-muted-foreground">{t("growth.desc")}</p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button onClick={handleCancel} variant="outline" className="rounded-xl border-border text-foreground">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave} className="rounded-xl bg-primary text-primary-foreground">
                <Save className="w-4 h-4 mr-2" /> {t("growth.save")}
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} variant="outline" className="rounded-xl border-border text-foreground">
              <Edit3 className="w-4 h-4 mr-2" /> {t("growth.edit")}
            </Button>
          )}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Weekly Posting Strategy</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Object.entries(editing ? editData : plan.weekly_strategy).map(([day, data]) => (
            <div key={day} className="bg-secondary/20 rounded-xl p-4 border border-border/50 hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{day}</span>
                {editing ? (
                  <input
                    value={data.time}
                    onChange={(e) => handleDayChange(day, "time", e.target.value)}
                    className="text-xs text-muted-foreground bg-transparent border-b border-border focus:border-primary outline-none w-20 text-right"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">{data.time}</span>
                )}
              </div>
              {editing ? (
                <>
                  <input
                    value={data.type}
                    onChange={(e) => handleDayChange(day, "type", e.target.value)}
                    className="text-sm font-medium bg-transparent border-b border-border focus:border-primary outline-none w-full mb-1"
                  />
                  <input
                    value={data.tip}
                    onChange={(e) => handleDayChange(day, "tip", e.target.value)}
                    className="text-xs text-muted-foreground bg-transparent border-b border-border focus:border-primary outline-none w-full"
                  />
                </>
              ) : (
                <>
                  <p className="text-sm font-medium mb-1">{data.type}</p>
                  <p className="text-xs text-muted-foreground">{data.tip}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Posting Times */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Best Posting Times</h2>
          </div>
          <div className="space-y-4">
            {plan.best_posting_times.map((slot) => (
              <div key={slot.day} className="bg-secondary/20 rounded-xl p-4">
                <p className="text-sm font-medium mb-2">{slot.day}</p>
                <div className="flex flex-wrap gap-2">
                  {slot.times.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Topics */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Recommended Topics</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.recommended_topics.map((topic) => (
              <span key={topic} className="px-3 py-2 rounded-xl bg-secondary/20 border border-border/50 text-sm text-secondary-foreground hover:border-primary/30 hover:text-primary transition-all cursor-default">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Ideas */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Content Ideas</h2>
          </div>
          <Button onClick={handleRegenerate} disabled={regenerating} variant="outline" className="rounded-xl border-border text-foreground text-sm h-9">
            <RefreshCw className={`w-4 h-4 mr-2 ${regenerating ? "animate-spin" : ""}`} />
            {t("growth.regenerate")}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {plan.content_ideas.map((idea, i) => (
            <div key={i} className="group bg-secondary/20 rounded-xl p-4 border border-border/50 hover:border-primary/20 hover:-translate-y-0.5 transition-all cursor-default">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-0.5 flex-shrink-0 transition-colors" />
                <p className="text-sm text-secondary-foreground group-hover:text-foreground transition-colors">{idea}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
