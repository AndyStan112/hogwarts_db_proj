import React from "react";

const page = () => {
  return (
    <div>
      <section className="py-12 bg-gray-800 text-white text-center">
        <h1 className="text-4xl font-bold mt-12">Blog</h1>
      </section>

      <section className="py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <img
              src="/images/graduation.jpg"
              alt="Graduation"
              className="w-full h-auto rounded-lg mb-6"
            />
            <h2 className="text-2xl font-semibold mb-4">Graduation Day 2024</h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              <strong>
                It feels like just yesterday that I stepped into the Great Hall
                for the very first time, the Sorting Hat hovering over my head,
                my heart racing with anticipation. Now, I stand here on the
                grounds of Hogwarts School of Witchcraft and Wizardry, gazing up
                at the majestic castle one last time as a student. Today, I'm
                not just a Hogwarts student—I'm a Hogwarts graduate.
              </strong>
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              The sun is shining brightly over the castle, casting a magical
              glow over the grounds where we've all gathered. My friends and I,
              clad in our robes and house colors, share nervous smiles and
              excited whispers. This day marks the culmination of seven
              unforgettable years filled with wonder, challenges, and growth.
              From mastering the Levitation Charm in our first year to
              navigating the complexities of N.E.W.T.s, every moment has led us
              to this point.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              As Professor McGonagall steps up to the podium, her eyes twinkle
              with pride behind her spectacles. She speaks of courage,
              resilience, and the bonds we've forged within these ancient walls.
              She reminds us that while we leave Hogwarts as graduates, we will
              always carry a part of this magical place with us, no matter where
              our wands may take us.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              After the speeches, we receive our diplomas. Each of us steps
              forward as our names are called, the applause of our peers and
              professors echoing around the Great Hall. I glance out to see my
              family beaming with pride, their eyes glistening as they watch me
              receive my certificate. I know that, just like me, they're
              reflecting on the journey that brought us all here.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              The celebration continues outside on the lawn. There are tables
              laden with a feast prepared by the house-elves, and the enchanted
              sky above us is filled with fireworks. I find myself surrounded by
              friends, laughter, and stories of our time at Hogwarts. We talk
              about the first time we visited Hogsmeade, the thrill of Quidditch
              matches, the nights spent in the library cramming for exams, and
              the camaraderie in our common rooms.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              But amidst the joy and celebration, there's a bittersweet note. We
              know that this is the last time we'll stand together as Hogwarts
              students. Tomorrow, we'll step into the world as witches and
              wizards, ready to make our own mark. It's a world that feels a
              little less daunting because of everything Hogwarts has taught us.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              As the evening draws to a close and the castle lights glow softly
              in the distance, I take a moment to walk down to the Black Lake.
              The reflection of the castle on the water is serene, a perfect
              mirror of the magic within. I think of all the adventures we've
              had and all the lessons we've learned, not just about magic, but
              about friendship, bravery, and being true to ourselves.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              Hogwarts isn't just a school—it's home. And though we may be
              leaving, it will always be a part of us. Graduation is not an end
              but a beginning. It's the start of a new adventure, and I can't
              wait to see where it takes us.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              Here's to the Class of 2024. Mischief managed, and onwards to the
              next great adventure!
            </p>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
              <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter E-mail"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                />
                <textarea
                  rows={5}
                  placeholder="Your Comment"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
                >
                  POST COMMENT
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Our Prides:</h3>
            {[
              { name: "Percy Weasley", score: "10!" },
              { name: "Hermione Granger", score: "9.98" },
              { name: "Luna Lovegood", score: "9.92" },
              { name: "Cedric Diggori", score: "9.90" },
              {
                name: "Honoring mentions: Harry Potter & Ron Weasley",
                score: "9.5",
              },
            ].map((pride, idx) => (
              <div key={idx} className="flex justify-between items-center mb-3">
                <span>{pride.name}</span>
                <span className="font-semibold">{pride.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6 bg-gray-900 text-center text-white">
        <p>
          Made with <i className="fa fa-heart-o text-red-500"></i> by M.Iseline
          <br />
          E-mail: miriam.iseline@gmail.com
        </p>
      </footer>
    </div>
  );
};
export default page;
