"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Tipo para las estadísticas
type Stat = {
    value: string;
    label: string;
    };

    // Tipo para los logros
    type Achievement = {
    year: string;
    title: string;
    description: string;
    };

    // Tipo para clubes
    type Club = {
    name: string;
    years: string;
    image: string;
    color: string;
    };

    // Tipo para tarjetas
    type Card = {
    title: string;
    description: string;
    icon: React.ReactNode;
    };

    // Componente para el efecto de partículas
    const ParticlesEffect = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
            <div 
            key={i}
            className="absolute rounded-full bg-yellow-400"
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 1}px`,
                height: `${Math.random() * 6 + 1}px`,
                opacity: Math.random() * 0.3,
                animation: `floatingParticle ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
            }}
            />
        ))}
        </div>
    );
    };

    const pinterestImages = [
        "https://i.pinimg.com/736x/95/8e/28/958e2825f9a762adcda4db5ecebb5ee2.jpg",
        "https://i.pinimg.com/736x/d5/dd/14/d5dd140bd370f20826924e518ca34052.jpg",
        "https://i.pinimg.com/736x/82/39/24/8239242fdfbd0212fad7b7c947d38597.jpg",
        "https://i.pinimg.com/736x/86/9e/31/869e31e8887bf8d42f54324998071daa.jpg",
        "https://i.pinimg.com/736x/28/96/f9/2896f9281d9f6c17ad6ce5a540f6acd1.jpg",
        "https://i.pinimg.com/736x/44/1d/1f/441d1f5e046fa85741df8f2ca4e4858f.jpg"
    ];

    // Componente para Paralax Scroll
    const ParallaxSection = ({ 
        children, 
        speed = 0.5, 
        className = "" 
    }: {
        children: React.ReactNode;
        speed?: number;
        className?: string;
    }) => {
        const sectionRef = useRef<HTMLDivElement>(null);
        const [offset, setOffset] = useState(0);
    
        useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                sectionRef.current.getBoundingClientRect(); // Si necesitas llamar a la función
                const offsetValue = window.scrollY * speed;
            setOffset(offsetValue);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        }, [speed]);
    
        return (
        <div 
            ref={sectionRef} 
            className={`relative ${className}`}
            style={{
            transform: `translateY(${offset}px)`
            }}
        >
            {children}
        </div>
    );
};

// Componente para el botón
    const PremiumButton = ({ 
        children, 
        primary = true, 
        onClick = () => {}, 
        className = "" 
    }: {
        children: React.ReactNode;
        primary?: boolean;
        onClick?: () => void;
        className?: string;
    }) => {
    return (
        <button
            onClick={onClick}
            className={`
            ${primary 
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700' 
                : 'bg-transparent border border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-white'
            }
            px-6 py-3 rounded-md font-medium transition-all duration-300 
            transform hover:-translate-y-1 hover:shadow-lg
            ${primary ? 'hover:shadow-yellow-500/20' : ''}
            ${className}
            `}
        >
            {children}
        </button>
    );
};

    // Componente para secciones
    const SectionTitle = ({ subtitle, title }: {
        subtitle: string;
        title: string;
    }) => {
    return (
        <div className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-yellow-500 uppercase tracking-widest text-sm mb-2">{subtitle}</p>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{title}</h2>
            <div className="mt-4 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            </div>
        </div>
    );
};

    // Componente Principal
    const RonaldoPage = () => {
    // States
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeVideo, setActiveVideo] = useState<number | null>(null);
    const [currentTab, setCurrentTab] = useState('all');
    const [isPreloading, setIsPreloading] = useState(true);
    

    // Datos de estadísticas
    const stats: Stat[] = [
        { value: "352", label: "Goles" },
        { value: "98", label: "Brasil" },
        { value: "2", label: "Mundiales" },
        { value: "4", label: "Clubes" }
    ];

    // Datos de logros
    const achievements: Achievement[] = [
        { year: "1994", title: "Campeón Mundial", description: "Formó parte del equipo de Brasil que ganó la Copa del Mundo" },
        { year: "1997", title: "Balón de Oro", description: "Ganó su primer Balón de Oro como el mejor jugador del mundo" },
        { year: "2002", title: "Campeón y Goleador", description: "Ganó la Copa del Mundo y fue el máximo goleador con 8 tantos" },
        { year: "2003", title: "Mejor jugador FIFA", description: "Nombrado mejor jugador del año por la FIFA" },
    ];

    // Datos de clubes
    const clubs: Club[] = [
        { name: "PSV", years: "1994-1996", image: "/images/clubs/psv.png", color: "from-red-600 to-white" },
        { name: "Barcelona", years: "1996-1997", image: "/images/clubs/barcelona.png", color: "from-blue-700 to-red-700" },
        { name: "Inter", years: "1997-2002", image: "/images/clubs/inter.png", color: "from-blue-900 to-black" },
        { name: "Real Madrid", years: "2002-2007", image: "/images/clubs/real-madrid.png", color: "from-white to-blue-200" },
    ];

    // Características únicas
    const uniqueFeatures: Card[] = [
        {
        title: "Velocidad Explosiva",
        description: "Capacidad increíble para alcanzar velocidades máximas en distancias cortas.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
        },
        {
        title: "Regate Devastador",
        description: "Famoso por su 'elastico', podía regatear a varios defensores en espacios reducidos.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
        )
        },
        {
        title: "Definición Letal",
        description: "Precisión incomparable frente a la portería, convirtiéndolo en uno de los mejores goleadores.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
        )
        },
    ];

    // Efecto de scroll
    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Efecto de precarga
    useEffect(() => {
        // Simulación de carga de recursos
        const timer = setTimeout(() => {
        setIsPreloading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);

// Función de scroll suave
const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
    setMenuOpen(false);
};

    if (isPreloading) {
        return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-center">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">R9</div>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <div className="loader-dots flex space-x-2 justify-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-loader"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-loader" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-loader" style={{ animationDelay: '0.4s' }}></div>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Efecto de partículas */}
        <ParticlesEffect />
        
        {/* Fondo Gradiente */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-gray-900 to-black opacity-90"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-overlay filter blur-[150px] opacity-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay filter blur-[150px] opacity-5 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Líneas decorativas */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
            {/* Grid lines */}
            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-6 gap-8">
                {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-full w-px bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-20"></div>
                ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full grid grid-rows-6 gap-8">
                {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20"></div>
                ))}
            </div>
            </div>
        </div>

        {/* Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-black bg-opacity-80 backdrop-blur-md shadow-lg' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
            <div className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">R9</span>
            </div>
            
            {/* Menú de navegación */}
            <div className="hidden md:flex space-x-8">
                <button onClick={() => scrollToSection('home')} className="text-sm font-medium uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 relative group">
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('about')} className="text-sm font-medium uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 relative group">
                Historia
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('career')} className="text-sm font-medium uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 relative group">
                Carrera
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('achievements')} className="text-sm font-medium uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 relative group">
                Logros
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => scrollToSection('gallery')} className="text-sm font-medium uppercase tracking-wider hover:text-yellow-400 transition-colors duration-300 relative group">
                Galería
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
            </div>
            
            <div className="flex items-center space-x-4">
                {/* Botón de tienda */}
                <button className="hidden md:block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium px-5 py-2 rounded-md transition-all duration-300 shadow-lg hover:shadow-yellow-500/20 uppercase tracking-wider text-sm">
                Tienda Oficial
                </button>
                
                {/* Botón de menú móvil */}
                <button 
                className="md:hidden text-yellow-400 focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
                </button>
            </div>
            </div>
            
            {/* Menú móvil */}
            {menuOpen && (
            <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-lg shadow-2xl py-4 border-t border-gray-800">
                <div className="px-6 py-2 space-y-2">
                <button onClick={() => scrollToSection('home')} className="block w-full text-left py-3 px-4 text-gray-200 hover:bg-gray-800 hover:text-yellow-400 rounded-md transition-colors duration-300">
                    Inicio
                </button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left py-3 px-4 text-gray-200 hover:bg-gray-800 hover:text-yellow-400 rounded-md transition-colors duration-300">
                    Historia
                </button>
                <button onClick={() => scrollToSection('career')} className="block w-full text-left py-3 px-4 text-gray-200 hover:bg-gray-800 hover:text-yellow-400 rounded-md transition-colors duration-300">
                    Carrera
                </button>
                <button onClick={() => scrollToSection('achievements')} className="block w-full text-left py-3 px-4 text-gray-200 hover:bg-gray-800 hover:text-yellow-400 rounded-md transition-colors duration-300">
                    Logros
                </button>
                <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-3 px-4 text-gray-200 hover:bg-gray-800 hover:text-yellow-400 rounded-md transition-colors duration-300">
                    Galería
                </button>
                <div className="pt-2">
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 uppercase tracking-wider text-sm">
                    Tienda Oficial
                    </button>
                </div>
                </div>
            </div>
            )}
        </nav>
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col md:flex-row items-center pt-24 md:pt-0">
            {/* Franja lateral izquierda animada */}
            <div className="absolute left-0 w-1/4 md:w-1/6 h-screen bg-gradient-to-b from-yellow-600 to-yellow-800 opacity-20"></div>
            <div className="absolute left-0 w-4 h-screen bg-gradient-to-b from-yellow-400 to-yellow-600 opacity-40"></div>
            
            {/* Divisor central animado */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-[70vh] bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-30"></div>
            
            {/* Contenido */}
            <div className="w-full md:w-1/2 pt-12 md:pt-0 px-8 md:px-16 lg:px-24 z-10 relative">
            <div className="max-w-xl">
                {/* Subtítulo */}
                <div className="overflow-hidden mb-4">
                <p className="text-lg text-yellow-400 font-light tracking-widest animate-fade-in">LA LEYENDA DEL FÚTBOL</p>
                </div>
                
                {/* Título con efecto */}
                <div className="overflow-hidden mb-2">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold transform transition-transform duration-700 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400 pb-2">
                    RONALDO
                    </span>
                </h1>
                </div>
                
                <div className="overflow-hidden mb-6">
                <p className="text-xl md:text-2xl text-yellow-400 font-light tracking-wider animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    El Fenómeno
                </p>
                </div>
                
                {/* Línea divisoria */}
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}></div>
                
                {/* Descripción */}
                <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <p className="text-lg leading-relaxed text-gray-300">
                    Ronaldo Nazario es conocido en todo el mundo como uno de los delanteros más 
                    letales que jamás ha existido. Su velocidad, regate y capacidad goleadora 
                    revolucionaron el fútbol mundial y lo establecieron como uno de los mejores 
                    jugadores de todos los tiempos.
                </p>
                </div>
                
                {/* Estadísticas */}
                <div className="grid grid-cols-4 gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-gray-400">{stat.label}</div>
                    </div>
                ))}
                </div>
                
                {/* Botones */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <PremiumButton 
                    primary={true} 
                    onClick={() => scrollToSection('career')}
                >
                    EXPLORAR CARRERA
                </PremiumButton>
                <PremiumButton 
                    primary={false} 
                    onClick={() => scrollToSection('gallery')}
                >
                    VER HIGHLIGHTS
                </PremiumButton>
                </div>
                
                {/* Navegación a otro jugador */}
                <div className="mt-16 hidden md:block animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center group cursor-pointer">
                    <div className="w-14 h-14 rounded overflow-hidden group-hover:shadow-lg group-hover:shadow-yellow-500/20 transition-all duration-300">
                    <div className="bg-gradient-to-br from-gray-700 to-gray-900 w-full h-full flex items-center justify-center text-yellow-400 font-bold">
                        Z10
                    </div>
                    </div>
                    <div className="ml-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors duration-300">NEXT LEGEND</div>
                    <div className="text-sm font-medium group-hover:text-yellow-400 transition-colors duration-300">ZIDANE</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                </div>
            </div>
            </div>
            
            {/* Imagen de Ronaldo */}
            <div className="w-full md:w-1/2 h-[60vh] md:h-screen flex items-end justify-center md:justify-end relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent md:bg-gradient-to-l md:from-transparent md:to-transparent z-10"></div>
            <div className="relative z-20 h-full w-full max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Image 
                src="https://i.pinimg.com/736x/95/08/51/950851673cb7e6d8c653a6280b04f969.jpg" 
                alt="Ronaldo Nazario"
                fill
                className="object-contain object-bottom"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            
            {/* Habilidades - Círculos */}
            <div className="absolute bottom-0 right-0 p-8 space-y-6 z-20 opacity-0 md:opacity-100 animate-fade-in-right" style={{ animationDelay: '0.8s' }}>
                <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                    <div className="text-right mr-3">
                    <div className="text-xs uppercase tracking-wider text-gray-400">HABILIDAD TÁCTICA</div>
                    <div className="text-sm font-bold text-yellow-400">ELASTICO</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                </div>
                </div>
                
                <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                    <div className="text-right mr-3">
                    <div className="text-xs uppercase tracking-wider text-gray-400">HABILIDAD PASIVA</div>
                    <div className="text-sm font-bold text-yellow-400">DEFINICIÓN</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                </div>
                </div>
                
                <div className="flex flex-col items-end">
                <div className="flex items-center mb-2">
                    <div className="text-right mr-3">
                    <div className="text-xs uppercase tracking-wider text-gray-400">HABILIDAD DEFINITIVA</div>
                    <div className="text-sm font-bold text-yellow-400">GARRA DE ORO</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                </div>
                </div>
            </div>
            </div>
            
            {/* Flecha de scroll */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button onClick={() => scrollToSection('about')} className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                <span className="text-xs uppercase tracking-wider mb-2">Scroll</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>
            </div>
        </section>
        
        {/* Sección Sobre Ronaldo */}
        <section id="about" className="relative py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
            <SectionTitle subtitle="Conozca al" title="Fenómeno" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                {uniqueFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-900 bg-opacity-50 rounded-lg p-8 backdrop-blur-sm border border-gray-800 hover:border-yellow-500/30 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5">
                    <div className="text-yellow-400 mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                </div>
                ))}
            </div>
            
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">El jugador que cambió el fútbol para siempre</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    Ronaldo Luís Nazário de Lima, comúnmente conocido como Ronaldo, es considerado uno de los más grandes jugadores.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    Su combinación única de velocidad, fuerza, técnica y finalización lo convirtió en un delantero prácticamente imparable. A pesar de sufrir graves lesiones durante su carrera, su capacidad para reinventarse demostró su extraordinaria mentalidad y dedicación al deporte.
                </p>
                <p className="text-gray-300 leading-relaxed">
                    Apodado &ldquo;El Fenómeno&rdquo; por su capacidad para realizar lo imposible en el campo, Ronaldo dejó una huella imborrable en cada club donde jugó y es recordado como uno de los jugadores más influyentes en la historia del fútbol.
                </p>
                </div>
                
                <div className="order-1 md:order-2 relative">
                <div className="rounded-lg overflow-hidden h-96 w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                    <Image 
                    src="https://i.pinimg.com/736x/e8/32/bc/e832bc299d7a4c40e27718c77d391ddc.jpg" 
                    alt="Ronaldo en acción"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black font-bold py-2 px-4 rounded-md shadow-xl">
                    <span className="block text-3xl leading-none">9</span>
                </div>
                </div>
            </div>
            </div>
        </section>
        
        {/* Sección Carrera */}
        <section id="career" className="relative py-24 md:py-32 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
            <SectionTitle subtitle="Trayectoria" title="Clubes Legendarios" />
            
            <div className="mt-16 relative">
                {/* Línea temporal */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-800"></div>
                
                <div className="space-y-24">
                {clubs.map((club, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                        <h3 className="text-2xl font-bold mb-2">{club.name}</h3>
                        <p className="text-yellow-400 mb-4">{club.years}</p>
                        <p className="text-gray-400">Ronaldo brilló en el {club.name}, donde su talento y capacidad goleadora lo convirtieron en una leyenda instantánea del club.</p>
                    </div>
                    
                    <div className="my-6 md:my-0 z-10">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${club.color} flex items-center justify-center shadow-lg`}>
                        {/* Aquí iría el logo del club, pero usamos un placeholder */}
                        <div className="w-12 h-12 rounded-full bg-black bg-opacity-30 flex items-center justify-center text-white font-bold">
                            {club.name.charAt(0)}
                        </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-5/12"></div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </section>
        
        {/* Sección Logros */}
        <section id="achievements" className="relative py-24 md:py-32">
            <ParallaxSection speed={0.2} className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full opacity-5">
                <Image 
                src="https://i.pinimg.com/736x/95/8e/28/958e2825f9a762adcda4db5ecebb5ee2.jpg" 
                alt="Trofeo Mundial"
                fill
                className="object-cover opacity-20"
                sizes="100vw"
                />
            </div>
            </ParallaxSection>
            
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <SectionTitle subtitle="Reconocimientos" title="Logros Históricos" />
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                <div 
                    key={index} 
                    className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 hover:border-yellow-500/30 transform hover:-translate-y-2 transition-all duration-300"
                >
                    <div className="text-4xl font-bold text-yellow-500 mb-4">{achievement.year}</div>
                    <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                    <p className="text-gray-400">{achievement.description}</p>
                </div>
                ))}
            </div>
            
            <div className="mt-20 flex justify-center">
                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 border border-gray-800 max-w-3xl">
                <div className="flex items-center justify-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Datos Curiosos</h3>
                </div>
                
                <ul className="space-y-4">
                    <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex-shrink-0 mt-1 mr-3">
                        <div className="w-full h-full flex items-center justify-center text-black text-xs font-bold">1</div>
                    </div>
                    <p className="text-gray-300">Ronaldo es el segundo máximo goleador de la historia de la selección brasileña, con 62 goles en 98 partidos.</p>
                    </li>
                    <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex-shrink-0 mt-1 mr-3">
                        <div className="w-full h-full flex items-center justify-center text-black text-xs font-bold">2</div>
                    </div>
                    <p className="text-gray-300">Es el único jugador en la historia que ha ganado el premio al Jugador Mundial del Año de la FIFA tres veces (1996, 1997 y 2002).</p>
                    </li>
                    <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex-shrink-0 mt-1 mr-3">
                        <div className="w-full h-full flex items-center justify-center text-black text-xs font-bold">3</div>
                    </div>
                    <p className="text-gray-300">Tiene el récord de más goles marcados en una sola edición de la Copa Mundial (15 goles), superando al legendario Gerd Müller.</p>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </section>
        
        {/* Sección Galería */}
        <section id="gallery" className="relative py-24 md:py-32 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
            <SectionTitle subtitle="Momentos" title="Galería Legendaria" />
            
            <div className="mt-8 flex justify-center">
                <div className="inline-flex bg-gray-800 bg-opacity-50 rounded-full p-1 mb-12">
                <button 
                    onClick={() => setCurrentTab('all')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentTab === 'all' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
                >
                    Todo
                </button>
                <button 
                    onClick={() => setCurrentTab('goals')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentTab === 'goals' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
                >
                    Goles
                </button>
                <button 
                    onClick={() => setCurrentTab('cups')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentTab === 'cups' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
                >
                    Copas
                </button>
                <button 
                    onClick={() => setCurrentTab('moments')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentTab === 'moments' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
                >
                    Momentos
                </button>
                </div>
            </div>
            
            {/* Grid de imágenes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinterestImages.map((src, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg cursor-pointer">
                <div className="aspect-w-16 aspect-h-9 w-full">
                    <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <Image 
                    src={src}
                    alt={`Imagen de Ronaldo ${index + 1}`}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                    onClick={() => setActiveVideo(index)}
                    className="bg-yellow-500 text-black rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                </div>
                </div>
            ))}
            </div>
            
            <div className="mt-12 text-center">
                <PremiumButton primary={false}>
                VER MÁS
                </PremiumButton>
            </div>
            </div>
            
            {/* Modal de video */}
            {activeVideo !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
                <div className="relative w-full max-w-5xl">
                <button 
                    onClick={() => setActiveVideo(null)}
                    className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="aspect-w-16 aspect-h-9 w-full bg-gray-900 rounded-lg overflow-hidden">
                    {/* Aquí iría el reproductor de video */}
                    <div className="flex items-center justify-center h-full">
                    <p className="text-white">Video {activeVideo + 1} - Contenido no disponible en esta demostración</p>
                    </div>
                </div>
                </div>
            </div>
            )}
        </section>
        
        {/* Newsletter Section */}
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-yellow-500 opacity-5"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-30"></div>
            
            <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Únete a la comunidad</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Recibe las últimas noticias, contenido exclusivo y actualizaciones sobre Ronaldo Nazario y su legado.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center max-w-lg mx-auto">
                <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 mb-3 sm:mb-0"
                />
                <button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded-r-md transition-colors duration-300 sm:-ml-1">
                SUSCRIBIRSE
                </button>
            </div>
            
            <p className="text-gray-500 text-xs mt-4">
                Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
            </p>
            </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-black py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row justify-between mb-12">
                <div className="mb-8 md:mb-0">
                <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text block mb-4">R9</span>
                <p className="text-gray-400 max-w-xs">
                    Celebrando el legado de Ronaldo Nazario, uno de los más grandes futbolistas de todos los tiempos.
                </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-white font-bold mb-4">Enlaces</h3>
                    <ul className="space-y-2">
                    <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Inicio</button></li>
                    <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Historia</button></li>
                    <li><button onClick={() => scrollToSection('career')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Carrera</button></li>
                    <li><button onClick={() => scrollToSection('achievements')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Logros</button></li>
                    <li><button onClick={() => scrollToSection('gallery')} className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Galería</button></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="text-white font-bold mb-4">Síguenos</h3>
                    <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Instagram</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Twitter</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Facebook</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">YouTube</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="text-white font-bold mb-4">Contacto</h3>
                    <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Prensa</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Soporte</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Colaboraciones</a></li>
                    </ul>
                </div>
                </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Ronaldo R9. Todos los derechos reservados.
                </p>
                
                <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                </a>
                </div>
            </div>
            </div>
        </footer>
        
        {/* Botón de scroll to top */}
        {scrolled && (
            <button 
            onClick={() => scrollToSection('home')}
            className="fixed bottom-6 right-6 bg-yellow-500 text-black rounded-full p-3 shadow-lg hover:bg-yellow-600 transition-colors duration-300 z-40"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            </button>
        )}
        </div>
    );
};

export default RonaldoPage;