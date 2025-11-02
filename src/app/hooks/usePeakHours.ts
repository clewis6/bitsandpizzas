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
        
        const isPeakTime = data.count > 10;
        
        setStatus({
          isPeak: isPeakTime,
          orderCount: data.count,
          estimatedTime: isPeakTime ? '40-45 minutes' : '20-30 minutes',
          loading: false
        });
      } catch (error) {
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
    
    // Refresh every 5 minutes
    const interval = setInterval(checkPeakStatus, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return status;
}
