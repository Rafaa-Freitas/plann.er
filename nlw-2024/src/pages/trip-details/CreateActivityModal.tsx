import { Calendar, Tag, X } from 'lucide-react';
import Button from '../../components/Button';
import { FormEvent, useContext } from 'react';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import { ActivityContext } from '../../context/ActivityContext';
import TripActivitiesResponse from '../../interfaces/TripActivitiesResponse.interface';
import CreateTripActivityResponse from '../../interfaces/CreateTripActivityResponse.interface';

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  const { setActivities } = useContext(ActivityContext);

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const occurs_at = data.get('occurs_at')?.toString();

    const response = await api.post<CreateTripActivityResponse>(
      `/trips/${tripId}/activities`,
      {
        title,
        occurs_at,
      },
    );

    if (
      (response.status === 201 || response.status == 200) &&
      response.data.activityId
    ) {
      api
        .get<TripActivitiesResponse>(`/trips/${tripId}/activities`)
        .then((response) => {
          setActivities(response.data.activities);
        });
    }

    closeCreateActivityModal();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[540px] bg-zinc-900 rounded-xl shadow-shape px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

            <button onClick={closeCreateActivityModal}>
              <X className="text-zinc-400" />
            </button>
          </div>

          <p className="text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>

          <form onSubmit={createActivity} className="space-y-3">
            <div className="border h-14 px-4 rounded-lg border-zinc-800 bg-zinc-950 flex items-center gap-2">
              <Tag className="text-zinc-400 size-5"></Tag>

              <input
                name="title"
                placeholder="Qual a atividade?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                autoComplete="off"
              />
            </div>

            <div className="border h-14 px-4 rounded-lg border-zinc-800 bg-zinc-950 flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5"></Calendar>

              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                autoComplete="off"
              />
            </div>

            <Button variant="primary" size="full">
              Salvar atividade
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateActivityModal;
