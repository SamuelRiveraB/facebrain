import ImageLinkForm from "@/components/ImageLinkForm/ImageLinkForm";
import Logo from "@/components/Logo/Logo";
import Navigation from "@/components/Navigation/Navigation";
import Particles from "@/components/Particles/Particles";

export default function Home() {
  return (
    <main className="relative h-[100vh] flex flex-col p-5 bg-gradient-to-r from-indigo-500 to-indigo-900 -z-10">
      <div className="flex justify-between">
        <Particles />
        <Logo />
        <Navigation />
      </div>
      <div className="flex justify-center items-center h-[100vh]">
        <ImageLinkForm />
      </div>
    </main>
  );
}
