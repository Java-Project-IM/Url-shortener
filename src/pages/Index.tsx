import { useState } from "react";
import UrlShortener from "@/components/UrlShortener";
import UrlList from "@/components/UrlList";
import Analytics from "@/components/Analytics";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Database, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Index() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedShortCode, setSelectedShortCode] = useState<string | null>(
    null
  );

  const handleUrlCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleViewAnalytics = (shortCode: string) => {
    setSelectedShortCode(shortCode);
  };

  const handleBackToList = () => {
    setSelectedShortCode(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="relative">
                <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse-slow" />
                <div className="absolute inset-0 bg-blue-600/20 dark:bg-blue-400/20 blur-xl animate-pulse-slow" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                URL Shortener
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground hidden sm:block">
                DSA Project - Hash Map & Queue
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Shorten Your URLs Instantly
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An enterprise-grade URL shortener demonstrating Hash Maps (O(1)
              lookups) and Queue-based rate limiting. Built with modern web
              technologies.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up animation-delay-200">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-yellow-600/20 dark:bg-yellow-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 dark:text-white">
                      O(1) Lookups
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Hash Map implementation for instant URL retrieval
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-blue-600/20 dark:bg-blue-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 dark:text-white">
                      Queue-Based Limiting
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      FIFO queue for rate limiting and abuse prevention
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Link2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-green-600/20 dark:bg-green-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 dark:text-white">
                      Click Analytics
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Track clicks and view detailed statistics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Functionality */}
          <div className="animate-fade-in-up animation-delay-400">
            {selectedShortCode ? (
              <Analytics
                shortCode={selectedShortCode}
                onBack={handleBackToList}
              />
            ) : (
              <>
                <UrlShortener onUrlCreated={handleUrlCreated} />
                <UrlList
                  refreshTrigger={refreshTrigger}
                  onViewAnalytics={handleViewAnalytics}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with React, Shadcn-UI, Node.js, Express, and MongoDB</p>
          <p className="mt-1">
            Demonstrating Hash Maps and Queue data structures
          </p>
        </div>
      </footer>
    </div>
  );
}
