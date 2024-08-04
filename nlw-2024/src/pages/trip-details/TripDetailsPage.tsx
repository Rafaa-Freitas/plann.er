import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateActivityModal from './CreateActivityModal';
import ImportantLinks from './ImportantLinks';
import Guests from './Guests';
import Activities from './Activities';
import DestinationAndDateHeader from './DestinationAndDateHeader';
import Button from '../../components/Button';
import { ActivityContextProvider } from '../../context/ActivityContext';

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl py-10 mx-auto space-y-8">
      <ActivityContextProvider>
        <DestinationAndDateHeader />

        <main className="flex gap-16 px-4">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-zinc-50 text-3xl font-semibold">
                Atividades
              </h2>

              <Button onClick={openCreateActivityModal}>
                <Plus className="size-5"></Plus>
                Cadastrar atividade
              </Button>
            </div>

            <Activities />
          </div>

          <div className="w-80 space-y-6">
            <ImportantLinks />

            <div className="w-full h-px bg-zinc-800"></div>

            <Guests />
          </div>
        </main>

        {isCreateActivityModalOpen && (
          <CreateActivityModal
            closeCreateActivityModal={closeCreateActivityModal}
          ></CreateActivityModal>
        )}
      </ActivityContextProvider>
    </div>
  );
}
