const page = () => {
  return (
    <section className="py-12 bg-gray-50">
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
              Hogwarts, we foster not only academic excellence but also lifelong
              friendships and extraordinary adventures.
            </p>
            <a
              href="https://harrypotter.fandom.com/wiki/Hogwarts_School_of_Witchcraft_and_Wizardry"
              className="inline-block px-6 py-3 text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg transition duration-300"
            >
              EXPLORE NOW
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
  );
};
export default page;
