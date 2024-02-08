import { ChangeEvent, useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import { NewNote } from "./components/new-note";
import { NoteCard } from "./components/note-card";

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search,setSearch] = useState('')
  // este estado armazena todas as minhas notas
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }

    return []
  });

  // esta funcao cria uma nova nota e guarda no array em primeiro lugar e copia as outras para dentro do array
  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    // aqui estamos a guardar no localStorage o nosso array transformado em JSON pois o localstorage nao consegue armazenar arrays
    localStorage.setItem('notes', JSON.stringify(notesArray))

  }

  function onNoteDeleted(id: string){
    const notesArray = notes.filter(note => {
      return note.id !== id
    })
    setNotes(notesArray)
  }

  function handleSearch (event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value

    setSearch(query)
  }
  
  // aqui fazemos a filtragem das notas pelo o que o utilizador digitar buscar
  const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="nlw-expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700"></div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gid-cols-1 gap-6 auto-rows-[250px]">
        {/*
            aqui passamos a funcao onNoteCreated para o component NewNote
        */}
        <NewNote onNoteCreated={onNoteCreated} />
        {/*
            aqui e feito um map para ler o array e mostrar todas as notas
        */}
        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>;
        })}
      </div>
    </div>
  );
}
