import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, ExternalLink, Trash2, BarChart3, Loader2 } from "lucide-react";
import {
  getAllUrls,
  deleteUrl,
  copyToClipboard,
  type UrlData,
} from "@/services/api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UrlListProps {
  refreshTrigger: number;
  onViewAnalytics: (shortCode: string) => void;
}

export default function UrlList({
  refreshTrigger,
  onViewAnalytics,
}: UrlListProps) {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUrls = async () => {
    setLoading(true);
    const data = await getAllUrls();
    setUrls(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, [refreshTrigger]);

  const handleCopy = async (shortUrl: string) => {
    try {
      await copyToClipboard(shortUrl);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDelete = async () => {
    if (!urlToDelete) return;

    setDeleting(true);
    const success = await deleteUrl(urlToDelete);
    setDeleting(false);

    if (success) {
      toast.success("URL deleted successfully");
      fetchUrls();
    } else {
      toast.error("Failed to delete URL");
    }
    setDeleteDialogOpen(false);
    setUrlToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <Card className="w-full mt-8 shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Your Shortened URLs</CardTitle>
          <CardDescription>
            Manage and track your shortened links
          </CardDescription>
        </CardHeader>
        <CardContent>
          {urls.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <p className="text-lg">No URLs yet</p>
              <p className="text-sm mt-1">
                Create your first shortened URL above!
              </p>
            </div>
          ) : (
            <div className="rounded-md border dark:border-gray-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-gray-700">
                    <TableHead className="dark:text-gray-300">
                      Original URL
                    </TableHead>
                    <TableHead className="dark:text-gray-300">
                      Short Code
                    </TableHead>
                    <TableHead className="dark:text-gray-300">Clicks</TableHead>
                    <TableHead className="dark:text-gray-300">
                      Created
                    </TableHead>
                    <TableHead className="text-right dark:text-gray-300">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {urls.map((url, index) => (
                    <TableRow
                      key={url._id}
                      className="animate-fade-in dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="max-w-xs truncate">
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
                        >
                          <span className="truncate">{url.originalUrl}</span>
                          <ExternalLink className="h-3 w-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        </a>
                      </TableCell>
                      <TableCell>
                        <code className="bg-muted dark:bg-gray-700 px-2 py-1 rounded text-sm dark:text-gray-200">
                          {url.shortCode}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="animate-pulse-slow dark:bg-gray-700 dark:text-gray-200"
                        >
                          {url.clicks}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground dark:text-gray-400">
                        {formatDate(url.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(url.shortUrl)}
                            title="Copy short URL"
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onViewAnalytics(url.shortCode)}
                            title="View analytics"
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setUrlToDelete(url.shortCode);
                              setDeleteDialogOpen(true);
                            }}
                            title="Delete URL"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-gray-900 dark:border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">
              Delete URL?
            </AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This action cannot be undone. The shortened URL will no longer
              work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleting}
              className="dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
