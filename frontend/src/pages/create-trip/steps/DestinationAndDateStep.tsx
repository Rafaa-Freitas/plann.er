import { ArrowRight, Calendar, MapPin, Settings2, X } from 'lucide-react';
import Button from '../../../components/Button';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

function DestinationAndDateStep({
  isGuestsInputOpen,
  eventStartAndEndDates,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function cleareventStartAndEndDates() {
    setEventStartAndEndDates(undefined);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "dd ' de ' LLL")
          .concat(' até ')
          .concat(format(eventStartAndEndDates.to, "dd ' de ' LLL"))
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />

        <input
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          disabled={isGuestsInputOpen}
          autoComplete="off"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left w-[240px]"
        onClick={openDatePicker}
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className="flex-1 text-lg text-zinc-400 w-40">
          {displayedDate ?? 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-xl shadow-shape px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>

                <button onClick={closeDatePicker}>
                  <X className="text-zinc-400" />
                </button>
              </div>

              <DayPicker
                locale={ptBR}
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />

              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="secondary"
                  onClick={cleareventStartAndEndDates}
                >
                  Limpar
                </Button>

                <Button onClick={closeDatePicker}>Confirmar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800"></div>

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />{' '}
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}

export default DestinationAndDateStep;
