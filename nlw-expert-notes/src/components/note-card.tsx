// o import * as Dialog esta a dizer que pega todas as exportacoes que o react-dialog faz e coloca-as dentro de Dialog
import * as Dialog from "@radix-ui/react-dialog";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    // Dialog.Root e a tag q ira conter tudo do modal
    <Dialog.Root>
      {/* Dialog.DialogTrigger e o local onde irei clicar para abrir o modal */}
      <Dialog.DialogTrigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          {note.date.toISOString()}
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

        */}
        <Dialog.DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <div className="flex flex-1 flex-col gap-3 p-5">

          </div>
        </Dialog.DialogContent>
      </Dialog.DialogPortal>
    </Dialog.Root>
  );
}
