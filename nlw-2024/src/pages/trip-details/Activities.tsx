import { CircleCheck } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import TripActivitiesResponse from '../../interfaces/TripActivitiesResponse.interface';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityContext } from '../../context/ActivityContext';

function Activities() {
  const { tripId } = useParams();

  const { activities, setActivities } = useContext(ActivityContext);

  useEffect(() => {
    api
      .get<TripActivitiesResponse>(`/trips/${tripId}/activities`)
      .then((response) => {
        setActivities(response.data.activities);
      });
  }, [tripId, setActivities]);

  return (
    <div className="space-y-8">
      {activities.map((activity) => {
        return (
          <div key={activity.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                {format(activity.date, 'dd')}
              </span>
              <span className="text-xs text-zinc-500">
                {format(activity.date, 'EEEE', { locale: ptBR })}
              </span>
            </div>

            {activity.activities.length > 0 ? (
              <>
                {activity.activities.map((activityItem) => {
                  return (
                    <div key={activityItem.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300"></CircleCheck>
                        <span className="text-zinc-100">
                          {activityItem.title}
                        </span>
                        <span className="text-sm text-zinc-400 ml-auto">
                          {format(activityItem.occurs_at, 'HH:mm')}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Activities;
