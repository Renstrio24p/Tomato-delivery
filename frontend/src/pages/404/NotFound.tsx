export default function NotFound404() {
  return (
    <section className="w-full h-screen flex items-center justify-center  text-gray-800 animate-[fadeIn_0.5s_ease-in]">
      <div>
        <div className="flex items-center gap-2 text-[1.6em] font-semibold">
          <h1>404</h1>
          <p>|</p>
          <p>Page Not Found</p>
        </div>
        <p className="text-[1.2em] font-thin text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </section>
  );
}
