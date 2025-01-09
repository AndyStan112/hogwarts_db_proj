import Image from "next/image";



export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <header
        className="min-h-screen bg-cover bg-center relative w-full flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/banner.jpg')",
        }}
      >
        <div className="text-white mt-56">
          <h1 className="text-5xl font-bold">Hogwarts</h1>
          <p className="text-lg mt-4">
            Hogwarts School of Witchcraft and Wizardry
            <br />
            Discover your full magic potential and be the wizard of your dreams!
          </p>
          <div className="mt-6">
          <a
            href="/guest/register"
            className="mt-6 bg-[#d1ab59]  text-black  py-2 px-8 text-lg shadow-lg border border-black hover:bg-transparent hover:border-white hover:text-white transition duration-300"
          >
            Register Now
          </a>
        </div>
        </div>
      </header>

      <section className="py-12 w-4/5">
        <div className="max-w-7xl mx-auto bg-amber-100 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-semibold mb-4">
                One of the best wizard schools in the world!
              </h1>
              <p className="text-gray-700 leading-relaxed mb-6">
                For centuries, Hogwarts has been a beacon of magical education,
                offering students a rich curriculum in subjects such as Potions,
                Charms, Transfiguration, and Defense Against the Dark Arts. At
                Hogwarts, we foster not only academic excellence but also
                lifelong friendships and extraordinary adventures.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition duration-300"
              >
                Contact Us
              </a>
            </div>
            <div>
              <img
                src="images/minerva.png"
                alt="Minerva"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center py-24 w-4/5">
        <h2 className="text-3xl font-bold">- Explore the Campus -</h2>
        <p className="text-gray-600 mt-2">
          From our enchanted dining hall to the iconic Quidditch field, Hogwarts
          is full of magical places to explore.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            {
              img: "/images/cafeteria.jpg",
              name: "The Enchanted Dining Hall",
              desc: "Enjoy magical feasts under a bewitched ceiling that mirrors the sky above.",
            },
            {
              img: "/images/library.png",
              name: "Library",
              desc: "Dive into a treasure trove of magical knowledge and uncover ancient secrets.",
            },
            {
              img: "/images/quidditch.jpg",
              name: "Quidditch Field",
              desc: "Experience the thrill of flying and compete for glory in this legendary wizarding sport.",
            },
          ].map((facility, idx) => (
            <div
              key={idx}
              className="bg-[#f4e9d3] rounded-lg shadow-lg hover:shadow-xl transition p-4 text-center"
            >
              <Image
                src={facility.img}
                alt={facility.name}
                width={300}
                height={200}
                className="w-full rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{facility.name}</h3>
              <p className="text-gray-700 mt-2">{facility.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
