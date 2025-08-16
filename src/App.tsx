import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="relative w-full min-h-screen bg-content">
      <Navbar />
      <main className="pt-0">
        <Hero />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
