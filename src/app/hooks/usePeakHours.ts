'use client';

import { useState, useEffect } from 'react';

interface PeakStatus {
  isPeak: boolean;
  orderCount: number;
  estimatedTime: string;
  loading: boolean;
}

export function usePeakHours() {
  const [status, setStatus] = useState<PeakStatus>({
    isPeak: false,
    orderCount: 0,
    estimatedTime: '20-30 minutes',
    loading: true
  });

  useEffect(() => {
    async function checkPeakStatus() {
      try {
        // Check orders from last 1 hour
        const response = await fetch('/api/orders?hours=1');
        const data = await response.json();
        
        // Calculate estimated time based on order volume
        let estimatedTime = '20-30 minutes';
        let isPeakTime = false;
        
        if (data.count >= 15) {
          estimatedTime = '45-50 minutes';
          isPeakTime = true;
        } else if (data.count >= 10) {
          estimatedTime = '40-45 minutes';
          isPeakTime = true;
        } else if (data.count >= 6) {
          estimatedTime = '30-35 minutes';
          isPeakTime = false;
        } else if (data.count >= 3) {
          estimatedTime = '25-30 minutes';
          isPeakTime = false;
        } else {
          estimatedTime = '20-25 minutes';
          isPeakTime = false;
        }
        
        setStatus({
          isPeak: isPeakTime,
          orderCount: data.count,
          estimatedTime: estimatedTime,
          loading: false
        });
      } catch {
        // Fallback to default if API fails
        setStatus({
          isPeak: false,
          orderCount: 0,
          estimatedTime: '20-30 minutes',
          loading: false
        });
      }
    }

    checkPeakStatus();
    
    // Refresh every 2 minutes for more accurate estimates
    const interval = setInterval(checkPeakStatus, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return status;
}
