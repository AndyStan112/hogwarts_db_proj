import Image from "next/image";
export default function Home() {
  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-3xl font-bold">
          Welcome to Hogwarts School of Witchcraft and Wizardry
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Begin your magical journey with us. Discover your house, explore the
          wonders of Hogwarts, and become part of our enchanted community.
        </p>
        <div className="mt-6">
          <a
            href="/guest/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-blue-700 transition duration-300"
          >
            Register as a Student
          </a>
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold">- Our Houses -</h2>
        <p className="text-gray-600 mt-2">
          Let the magical Sorting Hat decide your future house!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[
            {
              id: "gryffindor",
              img: "images/Gryffindor_Crest.jpeg",
              name: "Gryffindor",
              desc: "The bravest of wizards are placed right in this house",
            },
            {
              id: "ravenclaw",
              img: "images/RavenclawCrest.jpeg",
              name: "Ravenclaw",
              desc: "For those with an insatiable thirst for knowledge, this house is like a dream",
            },
            {
              id: "hufflepuff",
              img: "images/HufflepuffCrest1.jpeg",
              name: "Hufflepuff",
              desc: "Determined, loyal, and passionate is what a true Hufflepuff is like!",
            },
            {
              id: "slytherin",
              img: "images/SlytherinCrest.jpeg",
              name: "Slytherin",
              desc: "Ambitious and cunning, Slytherins achieve their goals with determination",
            },
          ].map((house) => (
            <div
              key={house.id}
              id={`div-link-${house.id}`}
              className="bg-amber-100 rounded-lg shadow-lg p-4 text-center"
            >
              <img src={house.img} alt={`${house.name} House`} />
              <h3 className="font-semibold text-lg">{house.name}</h3>
              <p className="text-gray-700 mt-2">{house.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-gray-50">
        <h2 className="text-2xl font-semibold">- Explore the Campus -</h2>
        <p className="text-gray-600 mt-2">
          From our enchanted dining hall to the iconic Quidditch field, Hogwarts
          is full of magical places to explore.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {
              img: "images/cafeteria.jpg",
              name: "The Enchanted Dining Hall",
              desc: "Enjoy magical feasts under a bewitched ceiling that mirrors the sky above.",
            },
            {
              img: "images/library.png",
              name: "Library",
              desc: "Dive into a treasure trove of magical knowledge and uncover ancient secrets.",
            },
            {
              img: "images/quidditch.jpg",
              name: "Quidditch Field",
              desc: "Experience the thrill of flying and compete for glory in this legendary wizarding sport.",
            },
          ].map((facility, idx) => (
            <div
              key={idx}
              className="bg-amber-100 rounded-lg shadow-lg overflow-hidden"
            >
              <img src={facility.img} alt={facility.name} />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-center">
                  {facility.name}
                </h3>
                <p className="text-gray-700 mt-2 text-sm">{facility.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
