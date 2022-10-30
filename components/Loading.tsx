const Loading = ():JSX.Element => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80">
      <div className="flex w-full h-full">
        <div className="mx-auto my-auto w-28" >
          <img src="/loading.gif" />
          <p className="text-gray-200 text-center mt-3">画像作成中</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
