import Link from "next/link";
import Hero from "./home/page";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Explore</h2>
          <Link className="link" href="/Trending">
            See Trending →
          </Link>
        </div>
      </div>
    </div>
  );
}
