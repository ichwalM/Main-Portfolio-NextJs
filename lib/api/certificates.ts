import { apiClient } from './client';
import type { Certificate } from '@/types/certificate';

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const data = await apiClient<Certificate[]>('/certificates');
    // Ensure we always return an array
    if (Array.isArray(data)) {
      return data;
    }
    // Fallback if wrapped in data object
    if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as any).data)) {
      return (data as any).data;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch certificates:', error);
    return [];
  }
}
