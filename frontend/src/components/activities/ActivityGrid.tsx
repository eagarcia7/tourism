import React, { useState, useEffect } from 'react';
import type { Activity } from '../../types';
import { fetchActivities } from '../../services/api';
import LoadingIndicator from '../ui/LoadingIndicator';
import FilterButton from '../ui/FilterButton';
import ActivityCard from './ActivityCard';
import ArrowLink from '../common/ArrowLink';
import ErrorMessage from '../common/ErrorMessage';
import { MOCK_ACTIVITIES } from '../../data/mockActivities';

interface ActivityGridProps {
  /** ID of the destination to filter activities by */
  destinationId?: string;
  /** Number of activities to display */
  limit?: number;
  /** Category to filter by */
  category?: string;
}

/**
 * Grid component for displaying activities
 */
const ActivityGrid: React.FC<ActivityGridProps> = ({
  destinationId,
  limit = 6,
  category
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(category || 'all');

  const filters = [
    { id: 'all', label: 'All Activities' },
    { id: 'water', label: 'Water Activities' },
    { id: 'land', label: 'Land Activities' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'food', label: 'Food & Drink' }
  ];

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        
        // Prepare filter parameters
        const params: { destinationId?: string; category?: string } = {};
        if (destinationId) {
          params.destinationId = destinationId;
        }
        if (activeFilter !== 'all') {
          params.category = activeFilter;
        }
        
        // Fetch activities with filters
        const activitiesData = await fetchActivities(params);
        
        // Apply limit if specified
        const limitedData = limit ? activitiesData.slice(0, limit) : activitiesData;
        
        setActivities(limitedData);
        setError(null);
      } catch (err) {
        console.error("Error loading activities:", err);
        setError("Failed to load activities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [destinationId, limit, activeFilter]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  // If no activities or loading, use placeholder data for demo
  const displayActivities = activities.length > 0 ? activities : MOCK_ACTIVITIES;

  return (
    <div>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(filter => (
          <FilterButton
            key={filter.id}
            id={filter.id}
            label={filter.label}
            isActive={activeFilter === filter.id}
            onClick={handleFilterChange}
          />
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <LoadingIndicator message="Loading activities..." size="small" />
      )}

      {/* Error state */}
      {error && (
        <ErrorMessage message={error} />
      )}

      {/* Activities grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
      
      {/* View more link */}
      {displayActivities.length > 0 && limit && displayActivities.length >= limit && (
        <div className="mt-8 text-center">
          <a 
            href={destinationId ? `/islands/${destinationId}/activities` : "/activities"} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLink label="View all activities" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ActivityGrid;