import { Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AnalyzeContent() {
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState<null | { score: number; feedback: string[] }>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!content.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setAnalysis({
        score: Math.floor(60 + Math.random() * 35),
        feedback: [
          "Strong hook in the first 3 seconds — great for retention",
          "Consider adding trending hashtags for better discoverability",
          "Your CTA could be more specific — tell viewers exactly what to do",
          "The pacing is good but could benefit from a pattern interrupt around the middle",
          "Adding text overlay would improve accessibility and engagement",
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-1">Analyze Content</h1>
        <p className="text-muted-foreground">Get AI-powered feedback on your content</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Content Analysis</h2>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your content caption, script, or describe your video idea..."
          className="w-full h-32 bg-secondary/20 border border-border rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-primary transition-colors"
        />
        <Button onClick={handleAnalyze} disabled={loading || !content.trim()}
          className="mt-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold">
          {loading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Send className="w-4 h-4 mr-2" />
          )}
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      {analysis && (
        <div className="glass-card rounded-2xl p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold">Results</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Viral Score:</span>
              <span className="text-2xl font-bold font-display text-primary">{analysis.score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="space-y-3">
            {analysis.feedback.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-secondary/20 rounded-xl p-4">
                <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary-foreground">{f}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
