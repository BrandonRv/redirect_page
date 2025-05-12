import { useEffect, useState, useRef } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import GoogleMaps from '../components/GoogleMaps/GoogleMaps';
import Logo from "./Xorx.svg";
import AOS from "aos";
import "aos/dist/aos.css";

export function Welcome() {

  const [activeButton, setActiveButton] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);

  const interactiveItemsData = [
    {
      text: " Nuestra Sucursal",
      icon: FaMapLocationDot,
      property: true,
      action: () => setOpen(!open)
    },
    {
      text: " ¿Quieres enviarnos tu equipo de región?",
      icon: TbTruckDelivery,
      property: false,
      action: () => window.open("https://wa.me/+56929011528", "_blank"),
    },
    {
      text: " WhatsApp",
      icon: FaWhatsapp,
      property: false,
      action: () => window.open("https://wa.me/+56929011528", "_blank"),
    },
    {
      text: " Instagram",
      icon: FaInstagram,
      action: () => window.open("https://www.instagram.com/xortech.cl", "_blank"),
    },
    {
      text: " TikTok",
      icon: FaTiktok,
      property: false,
      action: () => window.open("https://www.tiktok.com/@xortech0", "_blank"),
    },
  ]
  // --- Lógica de animación (se mantiene igual) ---
  useEffect(() => {
    if (hoveredButton === null) {
      startAnimation();
    } else {
      stopAnimation();
    }
    return () => {
      stopAnimation();
    };
  }, [hoveredButton]);

  useEffect(() => {
    if (hoveredButton === null) {
      startAnimation();
    }
    return () => {
      stopAnimation();
    };
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [open]);

  const startAnimation = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveButton((prev) => (prev + 1) % 3);
    }, 2000);
  };

  const stopAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleItemClick = (index: number) => {
    const item = interactiveItemsData[index];
    if (item && item.action) {
      item.action();
    }
  };

  return (
    <main className={`flex justify-center pt-16 pb-4 px-4 -mt-10 text-gray-900 bg-transparent dark:text-gray-100`}>
      <div className="bg-gray-950 rounded-3xl opacity-95 items-center transiciones">
      <div className="flex flex-col items-center justify-center bg-transparent p-6 rounded-lg max-w-sm w-full">
        <img src={Logo} alt="Logo de XOR Tech" width="150px" className="mb-4" />
        <p className="text-gray-100 dark:text-gray-300">Empresa de Servicios Tecnico</p>
        <small className="text-gray-100 dark:text-gray-300 block mt-1">"Estamos Ubicados en Santiago"</small>
        <small className="text-gray-100 italic dark:text-gray-300 block mt-1">Somos expertos en Apple, Laptop y Tv</small>
        <div
          className="mt-12 space-y-2 w-full"
        >
          {interactiveItemsData.map((item, index) => {
            const IconComponent = item.icon;
            const property = item?.property
            return (
              <div className="w-full h-full">
                <div
                  key={index}
                  className={`p-[4px] w-[100%] mx-auto
                        ${(hoveredButton === index || (hoveredButton === null && index === activeButton))
                      ? "neon-button animate-shaking"
                      : ""
                    }`}>
                  <div
                    className={`bg-gray-200 dark:bg-gray-800 rounded-lg p-3.5 flex items-center 
                                space-x-3 cursor-pointer w-full hover:bg-gray-200 dark:hover:bg-gray-500 
                                transition-colors duration-200`}
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => handleItemClick(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleItemClick(index);
                      }
                    }}
                  >
                    <div className="flex-shrink-0">
                      <IconComponent size={24} color="white" />
                    </div>
                    <span className="flex-grow text-center pr-5 text-gray-700 dark:text-gray-200">
                      {item.text}
                    </span>
                  </div>
                </div>
                {property && open ? (
                  <div className={`mt-6 mb-6 bg-transparent w-full`} data-aos="fade-down">
                    <GoogleMaps isOpen={open} toggleOpen={() => setOpen(false)} />
                  </div>
                )
                  :
                  ""
                }
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </main>
  );
}