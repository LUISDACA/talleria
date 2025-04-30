import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative">
        {/* Red background overlay */}
        <div className="absolute inset-0 w-1/3 bg-red-600 right-0 z-0"></div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div className="text-2xl font-bold tracking-tighter">
              <h1>FENÓMENO</h1>
            </div>

            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <Link href="#" className="hover:text-red-600 transition-colors">
                CARRERA
              </Link>
              <Link href="#" className="hover:text-red-600 transition-colors">
                EQUIPOS
              </Link>
              <Link href="#" className="hover:text-red-600 transition-colors">
                MUNDIAL
              </Link>
              <Link href="#" className="hover:text-red-600 transition-colors">
                NOTICIAS
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="#"
                className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-red-700 transition-colors"
              >
                GALERÍA
              </Link>
            </div>
          </header>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left column - Player info */}
            <div className="space-y-6">
              <h2 className="text-5xl font-bold tracking-tight">RONALDO</h2>
              <p className="text-xl text-gray-600">El Fenómeno del Fútbol</p>

              <div className="relative mt-12">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Ronaldo Nazario"
                  width={400}
                  height={500}
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center mt-8 border-t pt-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=30&width=30"
                    alt="Brazil flag"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-xs text-gray-500">SIGUIENTE</p>
                  <p className="font-medium">ZIDANE</p>
                </div>
              </div>
            </div>

            {/* Right column - Player stats */}
            <div className="space-y-10 md:pl-12">
              <p className="text-sm leading-relaxed">
                Ronaldo Nazario es conocido en todo el mundo como uno de los delanteros más letales que el fútbol ha
                visto jamás - y eso es algo que todos saben. Su identidad es legendaria: velocidad sobrehumana, regate
                extraordinario, definición impecable, y una capacidad técnica inigualable. Un genio brasileño, un
                fenómeno natural, un talento único, y docenas de otros elogios dependiendo de quién cuente la historia.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500">HABILIDAD TÉCNICA</p>
                  <p className="text-xl font-bold">REGATE MAGISTRAL</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">CARACTERÍSTICA</p>
                  <p className="text-xl font-bold">VELOCIDAD</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">HABILIDAD DEFINITIVA</p>
                  <p className="text-xl font-bold">EL GOL IMPOSIBLE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
