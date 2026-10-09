const Loader = () => {
    return (
        <>
            <style>
                {`
          @keyframes jump {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-12px); }
          }
          .animate-jump {
            animation: jump 1.4s infinite ease-in-out;
          }
        `}
            </style>
            <div className="flex min-h-[400px] w-full items-center justify-center space-x-2 text-default/60">
                <span className="sr-only">Loading project data...</span>
                <div
                    className="h-3 w-3 animate-jump rounded-full bg-current"
                    style={{ animationDelay: '-0.32s' }}
                ></div>
                <div
                    className="h-3 w-3 animate-jump rounded-full bg-current"
                    style={{ animationDelay: '-0.16s' }}
                ></div>
                <div className="h-3 w-3 animate-jump rounded-full bg-current"></div>
            </div>
        </>
    );
};

export default Loader;