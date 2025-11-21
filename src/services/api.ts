/**
 * API Service for URL Shortener Frontend
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export interface ShortenUrlResponse {
  success: boolean;
  data?: {
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
  };
  error?: string;
}

export interface UrlData {
  _id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export interface AnalyticsData {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  totalClicks: number;
  createdAt: string;
  recentClicks: Array<{
    timestamp: string;
    ipAddress: string;
  }>;
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/**
 * Shorten a URL
 */
export async function shortenUrl(
  originalUrl: string
): Promise<ShortenUrlResponse> {
  try {
    const data = await fetchWithErrorHandling<ShortenUrlResponse>(
      `${API_BASE_URL}/api/shorten`,
      {
        method: "POST",
        body: JSON.stringify({ originalUrl }),
      }
    );
    return data;
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
}

/**
 * Get all shortened URLs
 */
export async function getAllUrls(): Promise<UrlData[]> {
  try {
    const data = await fetchWithErrorHandling<{
      success: boolean;
      data: UrlData[];
    }>(`${API_BASE_URL}/api/urls`);
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return [];
  }
}

/**
 * Get analytics for a specific short URL
 */
export async function getAnalytics(
  shortCode: string
): Promise<AnalyticsData | null> {
  try {
    const data = await fetchWithErrorHandling<{
      success: boolean;
      data: AnalyticsData;
    }>(`${API_BASE_URL}/api/analytics/${shortCode}`);
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
}

/**
 * Delete a shortened URL
 */
export async function deleteUrl(shortCode: string): Promise<boolean> {
  try {
    const data = await fetchWithErrorHandling<{ success: boolean }>(
      `${API_BASE_URL}/api/urls/${shortCode}`,
      {
        method: "DELETE",
      }
    );
    return data.success;
  } catch (error) {
    console.error("Error deleting URL:", error);
    return false;
  }
}

/**
 * Copy text to clipboard
 */
export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

/**
 * Check backend health
 */
export async function checkHealth(): Promise<{
  status: string;
  timestamp: string;
}> {
  try {
    const data = await fetchWithErrorHandling<{
      status: string;
      timestamp: string;
    }>(`${API_BASE_URL}/health`);
    return data;
  } catch (error) {
    console.error("Health check failed:", error);
    return {
      status: "ERROR",
      timestamp: new Date().toISOString(),
    };
  }
}
