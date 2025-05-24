const HeroSection = () => {
  return (
    <div
      className="bg-[url('/img/banner.jpg')] bg-cover bg-center bg-fixed h-[100vh] w-full flex items-center justify-end px-6 md:px-20"
    >
      <div className="text-center text-black  p-6 md:p-10 rounded-md max-w-md  backdrop-blur-md">
        <p className="text-sm mb-2 tracking-wide">It all arrived this week</p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Shop the new Brands <br />
          <span className="text-4xl text-center  md:text-6xl text-teal-600">Up to 60% off now</span>
        </h1>
        <button className="mt-6 border border-black px-6 py-2 hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
