import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Link as LinkIcon, Copy, Check, Sparkles } from "lucide-react";
import { shortenUrl, copyToClipboard } from "@/services/api";
import { toast } from "sonner";

interface UrlShortenerProps {
  onUrlCreated: () => void;
}

export default function UrlShortener({ onUrlCreated }: UrlShortenerProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    shortUrl: string;
    originalUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const response = await shortenUrl(url);

    setLoading(false);

    if (response.success && response.data) {
      setResult({
        shortUrl: response.data.shortUrl,
        originalUrl: response.data.originalUrl,
      });
      setUrl("");
      toast.success("URL shortened successfully!", {
        description: "Your shortened link is ready to use",
      });
      onUrlCreated();
    } else {
      setError(response.error || "Failed to shorten URL");
      toast.error(response.error || "Failed to shorten URL");
    }
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await copyToClipboard(result.shortUrl);
        setCopied(true);
        toast.success("Copied to clipboard!", {
          description: "Share your shortened link anywhere",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error("Failed to copy");
      }
    }
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <div className="relative">
            <LinkIcon className="h-5 w-5 animate-bounce-slow" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
          </div>
          Shorten URL
        </CardTitle>
        <CardDescription>
          Enter a long URL to get a short, shareable link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <Button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden group transition-all duration-300 hover:scale-105"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                <>
                  <span className="relative z-10">Shorten</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="animate-shake">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 animate-slide-in">
              <AlertDescription className="space-y-2">
                <div className="font-medium text-green-900 dark:text-green-100 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Success!
                </div>
                <div className="text-sm text-green-800 dark:text-green-200">
                  <div className="mb-1 truncate">
                    Original: {result.originalUrl}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">Short URL:</span>
                    <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-green-900 dark:text-green-100 flex-1 min-w-0 truncate">
                      {result.shortUrl}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopy}
                      className="h-7 transition-all duration-300 hover:scale-105"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 mr-1 animate-check" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
