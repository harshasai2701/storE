import { ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero.png';

const Hero = () => {
  return (
    <section className="relative w-full bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12 lg:py-24">

          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8 z-10">
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 uppercase mb-3">
                storE Premium
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white leading-tight transition-colors">
                Premium Products for <br />
                <span className="text-indigo-800 dark:text-indigo-400 font-bold">Your Lifestyle</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-zinc-400 max-w-xl transition-colors">
                Discover the latest in tech, fashion, and home essentials. Quality products, curated just for you, with the fastest delivery in town.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">10k+</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Products</p>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5k+</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Customers</p>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-zinc-800"></div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24/7</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Support</p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative lg:h-full flex items-center justify-center">
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                className="h-full w-full object-cover"
                src={heroImg}
                alt="Premium Lifestyle"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40"></div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
