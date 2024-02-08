// o import * as Dialog esta a dizer que pega todas as exportacoes que o react-dialog faz e coloca-as dentro de Dialog
import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  // Example of handling the date conversion gracefully

  return (
    // Dialog.Root e a tag q ira conter tudo do modal
    <Dialog.Root>
      {/* Dialog.DialogTrigger e o local onde irei clicar para abrir o modal */}
      <Dialog.DialogTrigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          {formatDistanceToNow(note.date, { locale: pt, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400 ">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
      </Dialog.DialogTrigger>

      {/* 
          DialogPortal e utilizado para que tudo o que tiver dentro dele em vez de aparecer onde o conteudo esta 
          aparece fora da div a frente de tudo.
      */}
      <Dialog.DialogPortal>
        {/* 
            DialogOverlay server para fazer o fundo do modal como se fosse uma div para meio que esconder o que 
            esta por tras do modal

            O inset-0 aplica o estilo de left,top,rigth,bottom tudd como 0 quando se quer q algo ocupe o ecra todo
        */}
        <Dialog.DialogOverlay className="inset-0 fixed bg-black/60" />
        {/* 
            Dialog.DialogContent e o local que ira conter o conteudo do nosso modal 
            overflow-hidden esconde tudo o que tiver a sair da dive onde ele se encontra
        */}
        <Dialog.DialogContent className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.DialogClose className="absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.DialogClose>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-200">
              {/*  
                  utilizando a funcao formatDistanceToNow da biblioteca de date-fns  nos vamos buscar os dados do props e colocamos
                  virgula e um objeto que ira conter o locale que ira colocar o texto em pt e o addSuffix: true que adiciona um sufixo
                  como " ha 2 minutos atras" ou seja se for false iria colocar assim " 2 minutos atras" 
              */}
              {formatDistanceToNow(note.date, { locale: pt, addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-slate-400 ">{note.content}</p>
          </div>
          <button
            type="button"
            onClick={() => onNoteDeleted(note.id)}
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none group" // group e o elemento pai dos proximos elementos
          >
            {/* 
                aqui no group-hover eu estou a dizer que quando o group(elemento pai) estiver com hover eu quero o underline neste elemento
            */}
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota?
            </span>
          </button>
        </Dialog.DialogContent>
      </Dialog.DialogPortal>
    </Dialog.Root>
  );
}
