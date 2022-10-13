import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { trpc } from "../utils/trpc";
import Card from "../components/Card";
import Slider from "../components/Slider";
const isDevMode = process.env.NODE_ENV === "development";

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { data } = trpc.glossary.getAll.useQuery();
  const utils = trpc.useContext();
  const addOneMutation = trpc.glossary.addOne.useMutation();
  const handleAddOne = async (input: {
    term: string;
    definition: string;
    resourceURL: string;
  }) => {
    const res = await addOneMutation.mutate(input, {
      onSuccess: () => utils.glossary.getAll.invalidate(),
    });
    console.log("RES", res);
  };

  return (
    <>
      <Head>
        <title>Le 📖</title>
        <meta
          name="description"
          content="Website for common words used in class"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="absolute top-1 right-1 inline-flex items-center rounded-md border border-transparent bg-indigo-400 p-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:top-4 md:right-4 md:px-6 md:py-3"
          >
            <PlusCircleIcon className="h-8 w-8 md:mr-2" aria-hidden="true" />
            <span className="hidden md:block">Add New</span>
          </button>
        )}
        <Slider add={handleAddOne} open={open} setOpen={setOpen} />
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Le <span className="text-purple-300">Glossaire</span> App
        </h1>
        <p className="text-2xl text-gray-700">
          A place to document definitions for common vocabulary used in class,
          and other shit Chad says
        </p>
        <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-2 lg:w-2/3">
          {data?.map((item) => (
            <Card
              id={item.id}
              key={item.id}
              term={item.term}
              definition={item.definition}
              resourceURL={item.resourceURL}
              isDev={isDevMode}
            />
          ))}
        </div>
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          Made with 💗 by Dad
        </div>
      </main>
    </>
  );
};

export default Home;
