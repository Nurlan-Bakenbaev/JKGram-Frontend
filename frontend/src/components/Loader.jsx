const Loader = () => {
  return (
    <div className="h-[50vh] flex items-center flex-col gap-5 justify-center">
      <div className="animate-spin rounded-full border-t-4 border-purple-500 
       h-12 w-12 mb-2"></div>
      <h4 className="text-2xl text-indigo-500"> Loading... </h4>
    </div>
  );
};

export default Loader;
