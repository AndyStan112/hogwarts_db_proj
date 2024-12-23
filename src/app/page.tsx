export default function Home() {
  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-2xl font-semibold">- Our Houses -</h1>
        <p className="text-gray-600 mt-2">
          Let the magic hat choose your future house!
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
              desc: "Ambitious and stubborn like a bull, but sharp-tongued like a snake, this is a Slytherin's essence",
            },
          ].map((house) => (
            <div
              key={house.id}
              id={`div-link-${house.id}`}
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
      </section>

      <section className="text-center py-12 bg-gray-50">
        <h1 className="text-2xl font-semibold">- Our Dorms -</h1>
        <p className="text-gray-600 mt-2">
          Be cozy in dorms designed to make you feel like home
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[
            {
              img: "images/gdorms.jpg",
              name: "Gryffindor",
              desc: "Safe in a Gryffindor's stronghold",
            },
            {
              img: "images/rdorms.jpg",
              name: "Ravenclaw",
              desc: "Endless things to explore here",
            },
            {
              img: "images/hdorms",
              name: "Hufflepuff",
              desc: "Cozy as a badger in a den!",
            },
            {
              img: "images/sdorms",
              name: "Slytherin",
              desc: "Sharpening your senses in a well-adapted place",
            },
          ].map((dorm, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={dorm.img}
                alt={`${dorm.name} Dorms`}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg font-semibold opacity-0 group-hover:opacity-100">
                  {dorm.name}
                </h3>
                <p className="text-sm mt-2 opacity-0 group-hover:opacity-100">
                  {dorm.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-12">
        <h1 className="text-2xl font-semibold">- Our Facilities -</h1>
        <p className="text-gray-600 mt-2">
          At Hogwarts, we have designed many activities and places for you!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {
              img: "images/cafeteria.jpg",
              name: "The enchanted dining hall",
              desc: "Pretty cool name, isn't it? What's better than enjoying a treacle tart with a person centuries older than you?!",
            },
            {
              img: "images/library.png",
              name: "Library",
              desc: "Many secrets lie beneath the covers of our books. Each lecture, ready to be discovered by curious students",
            },
            {
              img: "images/quidditch.jpg",
              name: "Quidditch field",
              desc: "What kind of wizard doesn't love a good match of quidditch? Here you can start racing with students your age for the quidditch trophy.",
            },
          ].map((facility, idx) => (
            <div
              key={idx}
              className="bg-amber-100 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={facility.img}
                alt={facility.name}
                className="w-full h-64 object-cover"
              />
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

      <section className="text-center py-12 bg-gray-50">
        <h1 className="text-2xl font-semibold">- What our students say -</h1>
        <p className="text-gray-600 mt-2">
          We encourage free thinking and liberty of speech!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {[
            {
              img: "images/user1.jpg",
              name: "Tomas Dorlent Cruplud",
              desc: "Really liked studying here! Friendly people and professional staff.",
              stars: 5,
            },
            {
              img: "images/user2.jpg",
              name: "Luna Lovegood",
              desc: "The library is incredible! But I think the herbology teacher is a bit suspicious...",
              stars: 3.5,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="flex items-center bg-amber-100 rounded-lg shadow-lg p-4"
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-700">{testimonial.desc}</p>
                <h3 className="font-semibold mt-2">{testimonial.name}</h3>
                <div className="mt-1 flex">
                  {[...Array(5)].map((_, starIdx) => (
                    <i
                      key={starIdx}
                      className={`fa fa-star${
                        starIdx < Math.floor(testimonial.stars)
                          ? ""
                          : testimonial.stars % 1 !== 0 &&
                            starIdx === Math.floor(testimonial.stars)
                          ? "-half-o"
                          : "-o"
                      } text-yellow-500 mr-1`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
