import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import Activity from '../interfaces/Activity.interface';

interface ActivityContext {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

export const ActivityContext = createContext<ActivityContext>({
  activities: [],
  setActivities: () => {},
});

export function ActivityContextProvider({ children }: PropsWithChildren) {
  const [activities, setActivities] = useState<Activity[]>([]);

  const updateActivities = useCallback((activities: Activity[]) => {
    setActivities(activities);
  }, []);

  return (
    <ActivityContext.Provider
      value={{ activities, setActivities: updateActivities }}
    >
      {children}
    </ActivityContext.Provider>
  );
}
