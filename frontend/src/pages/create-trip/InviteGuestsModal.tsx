import { FormEvent } from 'react';
import { AtSign, Plus, X } from 'lucide-react';
import Button from '../../components/Button';

interface InviteGuestsModalProps {
  emailsToInvite: string[];
  closeGuestsModal: () => void;
  addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
  emailsToInvite,
  closeGuestsModal,
  addEmailToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl shadow-shape py-5 px-6 bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>

            <button onClick={closeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="bg-zinc-800 flex items-center gap-2 px-2.5 py-1.5 rounded-md"
              >
                <span className="text-zinc-300">{email}</span>

                <button
                  onClick={() => {
                    removeEmailFromInvites(email);
                  }}
                >
                  <X className="text-zinc-300 size-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-zinc-800"></div>

        <form
          onSubmit={addEmailToInvite}
          className="py-2.5 px-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="flex items-center flex-1 gap-2 px-2">
            <AtSign className="text-zinc-400 size-5" />

            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="text-zinc-100 bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
              autoComplete="off"
            />
          </div>

          <Button variant="primary">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
