import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

import Participant from '../../interfaces/Participant.interface';
import TripParticipantsResponse from '../../interfaces/TripParticipantsResponse.interface';

function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api
      .get<TripParticipantsResponse>(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className=" text-zinc-50 font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name}
                </span>

                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>

              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="size-5 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}

export default Guests;
