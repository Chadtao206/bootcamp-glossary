import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { trpc } from "../utils/trpc";

export type CardData = {
  term: string;
  definition: string;
  resourceURL: string;
  id: string;
};

type CardProps = {
  term: string;
  definition: string;
  resourceURL: string;
  isDev: boolean;
  id: string;
  handleOpenEdit: (data: CardData) => void;
};

const Card = ({
  term,
  definition,
  resourceURL,
  isDev,
  id,
  handleOpenEdit,
}: CardProps) => {
  const ctx = trpc.useContext();
  const deleteMutation = trpc.glossary.deleteOne.useMutation();
  return (
    <section className="relative flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <button
        onClick={() => handleOpenEdit({ term, definition, resourceURL, id })}
        type="button"
        className="absolute top-1 right-1 flex items-center justify-center rounded-md bg-green-400 p-1 transition hover:bg-green-600"
      >
        <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <h2 className="text-lg text-gray-700">{term}</h2>
      <p className="text-sm text-gray-600">{definition}</p>
      {resourceURL && (
        <a
          className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
          href={resourceURL}
          target="_blank"
          rel="noreferrer"
        >
          Documentation
        </a>
      )}
      {isDev && (
        <button
          onClick={() =>
            deleteMutation.mutate(
              { id },
              {
                onSuccess: () => ctx.glossary.getAll.invalidate(),
              }
            )
          }
          type="button"
          className="flex w-12 items-center justify-center rounded-md bg-red-500 p-2"
        >
          <TrashIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
    </section>
  );
};

export default Card;
