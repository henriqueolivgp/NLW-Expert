import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

// aqui recebemos a funcao onNoteCreated que vem do app
interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}


let speechRecognition: SpeechRecognition | null = null

// chamamos a nossa funcao do tipo NewNoteCardProps para ir buscar todo o conteudo
export function NewNote({ onNoteCreated }: NewNoteCardProps) {
  const [isrecording, setRecording] = useState(false);
  // quando declaramos uma variavel do tipo boolean ela deve estar escrita em forma de pergunta
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  // esta funcao sempre que o utilizador escrever e apagar tudo o paragrafo de escolher gravar e escrever volta a aparecer
  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    // se o valor do event da textarea for igual a nada
    if (event.target.value === "") {
      // faz com q o paragrafo de escolher gravar e escrever volta a aparecer
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    // se a nota estiver vazia nao guarda a nota'
    if (content === "") {
      return;
    }

    // aqui chamamos a funcao onNoteCreated e passamos o nosso conteudo o content
    onNoteCreated(content);

    setContent("");
    setShouldShowOnboarding(true);

    toast.success("Nota criada com sucesso");
  }

  function handleStartRecording() {

    const isSpeechRecognitionAPIAvalible =
      "SpeechRecording" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvalible) {
      alert("Infelizmente seu navegador näo suporta a API de gravaqäo! ");
      return;
    }

    setRecording(true);
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const SpeechRecognition = new SpeechRecognitionAPI();
    SpeechRecognition.lang = "pt-PT";
    SpeechRecognition.continuous = true;
    SpeechRecognition.maxAlternatives = 1;
    SpeechRecognition.interimResults = true;

    SpeechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text,result) => {
        return text.concat(result[0].transcript)
      }, '')
      setContent(transcription)
    };

    SpeechRecognition.onerror = (event) => {
      console.error(event);
    };

    SpeechRecognition.start();
  }

  function handleStopRecording() {
    setRecording(false);

    if(speechRecognition !== null){
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.DialogTrigger className="rounded-md bg-slate-700 p-5 flex flex-col text-left gap-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400 ">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.DialogTrigger>

      <Dialog.DialogPortal>
        <Dialog.DialogOverlay className="inset-0 fixed bg-black/60" />
        <Dialog.DialogContent className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.DialogClose className="absolute top-0 right-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.DialogClose>
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                Adicionar nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400 ">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>

            {isrecording ? (
              <button
                type="submit"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none" // group e o elemento pai dos proximos elementos
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse"></div>
                Gravando ( clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500" // group e o elemento pai dos proximos elementos
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.DialogContent>
      </Dialog.DialogPortal>
    </Dialog.Root>
  );
}
