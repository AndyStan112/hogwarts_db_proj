import React from "react";
import Image from "next/image";
import HouseChart from "./HouseChart";

const page = () => {
  return (
    <div>
      <section className="py-12 bg-gray-800 text-white text-center">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-4xl font-bold mt-12">Houses</h1>
        </div>
      </section>

      <section className="py-12 text-center">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-semibold">- Our Houses -</h1>
          <h3 className="text-gray-700 mt-2">
            Check out our houses!
          </h3>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              {
                id: "gryffindor",
                img: "/images/Gryffindor_Crest.jpeg",
                name: "Gryffindor",
                desc: "The bravest of wizards are placed right in this house",
              },
              {
                id: "ravenclaw",
                img: "/images/RavenclawCrest.jpeg",
                name: "Ravenclaw",
                desc: "For those with an insatiable thirst for knowledge, this house is like a dream",
              },
              {
                id: "hufflepuff",
                img: "/images/HufflepuffCrest1.jpeg",
                name: "Hufflepuff",
                desc: "Determined, loyal, and passionate is what a true Hufflepuff is like!",
              },
              {
                id: "slytherin",
                img: "/images/SlytherinCrest.jpeg",
                name: "Slytherin",
                desc: "Ambitious and stubborn like a bull, but sharp-tongued like a snake, this is a Slytherin's essence",
              },
            ].map((house) => (
              <div
                key={house.id}
                className="bg-amber-100 rounded-lg shadow-lg p-4 text-center"
              >
                <img
                  src={house.img}
                  alt={`${house.name} Crest`}
                  className="w-3/4 mx-auto rounded-lg border-4 border-amber-600 mb-4"
                />
                <h3 className="font-semibold text-lg">{house.name}</h3>
                <p className="text-gray-700 mt-2">{house.desc}</p>
              </div>
            ))}
          </div>


          <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed mt-6">
            <p>
              At Hogwarts, every new student is sorted into one of the four
              prestigious houses: Gryffindor, Hufflepuff, Ravenclaw, or Slytherin.
              This important decision is made during the Sorting Ceremony at the
              beginning of the school year, and it's a moment that every young
              witch and wizard eagerly anticipates.
            </p>

            <div className="mt-14">
            <HouseChart />
            </div>
            

            <p className="-mt-18">
              The Sorting Hat, a magical and ancient artifact, is responsible for
              determining the house that best suits each student’s qualities and
              potential. With a history dating back over a thousand years, the
              Sorting Hat was originally owned by one of the founders of Hogwarts,
              Godric Gryffindor, and has been imbued with the wisdom and ideals of
              all four founders.
            </p>
          </div>

        </div>
      </section>

     
    </div>
  );
};

export default page;
