import { ArrowRight, UserRoundPlus } from 'lucide-react';
import Button from '../../../components/Button';

interface InviteGuestsStepsProps {
  openGuestsModal: () => void;
  emailsToInvite: string[];
  openConfirmTravelModal: () => void;
}

function InviteGuestsStep({
  emailsToInvite,
  openGuestsModal,
  openConfirmTravelModal,
}: InviteGuestsStepsProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        onClick={openGuestsModal}
        className="flex items-center gap-2 flex-1"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />

        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-lg text-start">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800"></div>

      <Button onClick={openConfirmTravelModal}>
        {' '}
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}

export default InviteGuestsStep;
