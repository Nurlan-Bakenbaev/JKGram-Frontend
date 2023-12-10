const Loader = () => {
  return (
    <div className="flex items-center flex-col gap-5 justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-600 border-opacity-25 h-12 w-12"></div>
      <h4 className="text-2xl text-indigo-500"> Loading... </h4>
    </div>
  );
};

export default Loader;
