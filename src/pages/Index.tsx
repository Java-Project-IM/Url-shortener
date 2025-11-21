import { useState } from "react";
import UrlShortener from "@/components/UrlShortener";
import UrlList from "@/components/UrlList";
import Analytics from "@/components/Analytics";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Database, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  FloatingParticles,
  AnimatedLinkChain,
} from "@/components/AnimatedSVGs";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20">
        <FloatingParticles className="w-full h-full" />
      </div>

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow animation-delay-500" />

      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in-down">
              <div className="relative w-10 h-10">
                <AnimatedLinkChain className="w-full h-full" />
              </div>
              <h1 className="text-2xl font-bold gradient-text animate-gradient">
                URL Shortener
              </h1>
            </div>
            <div className="flex items-center gap-4 animate-fade-in-down animation-delay-200">
              <div className="text-sm text-muted-foreground hidden sm:block">
                DSA Project - Hash Map & Queue
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Shorten Your URLs{" "}
              <span className="gradient-text animate-gradient">Instantly</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              An enterprise-grade URL shortener demonstrating Hash Maps (O(1)
              lookups) and Queue-based rate limiting. Built with modern web
              technologies.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
            <Card className="group hover-lift border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
                    <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 dark:text-white text-lg">
                      O(1) Lookups
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Hash Map implementation for instant URL retrieval
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 overflow-hidden relative animation-delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
                    <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 dark:text-white text-lg">
                      Queue-Based Limiting
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      FIFO queue for rate limiting and abuse prevention
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 overflow-hidden relative animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
                    <Link2 className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 dark:text-white text-lg">
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
      <footer className="border-t mt-12 py-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-300 relative z-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-2">
          <p className="animate-fade-in">
            Built with React, Shadcn-UI, Node.js, Express, and MongoDB
          </p>
          <p className="animate-fade-in animation-delay-100">
            Demonstrating Hash Maps and Queue data structures
          </p>
        </div>
      </footer>
    </div>
  );
}
