const Welcomepage = () => {
  return (
    <section className="flex flex-col items-center self-stretch px-20 pt-32 pb-48 my-auto w-full text-2xl text-black bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:py-16 max-md:mt-6 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-[369px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/588ee035fcc886cda6f7860c38e04f31ff3cd8e37a9801b450a98638ec637905?placeholderIfAbsent=true&apiKey=abac2ec54bba43e4b308d7b16cc976ef"
          alt="Digitalflake admin logo"
          className="object-contain self-center max-w-full aspect-[1.89] w-[276px]"
        />
        <h1>Welcome to Digitalflake admin</h1>
      </div>
    </section>
  );
};

export default Welcomepage;
