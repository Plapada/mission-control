'use client';

import { useEffect, useRef } from 'react';
import { ActivityLog } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelativeTime, cn } from '@/lib/utils';

interface ActivityFeedProps {
  activities: ActivityLog[];
  maxItems?: number;
}

export function ActivityFeed({ activities, maxItems = 100 }: ActivityFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayActivities = activities.slice(0, maxItems);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activities]);

  return (
    <div 
      ref={containerRef}
      className="glass-card p-4 max-h-[400px] overflow-y-auto space-y-3"
    >
      {displayActivities.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p className="text-sm">No activities yet</p>
        </div>
      ) : (
        displayActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors animate-slide-in',
              index === 0 && 'bg-blue-50/50'
            )}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <Avatar 
              fallback={activity.agent?.name?.charAt(0) || '?'} 
              size="sm" 
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700 text-sm">
                  {activity.agent?.name || 'Unknown'}
                </span>
                <span className="text-slate-400 text-xs">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mt-0.5">
                {activity.action}
              </p>

              {activity.details && Object.keys(activity.details).length > 0 && (
                <pre className="text-xs text-slate-400 mt-2 bg-slate-50 p-2 rounded-lg overflow-x-auto">
                  {JSON.stringify(activity.details, null, 2)}
                </pre>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
