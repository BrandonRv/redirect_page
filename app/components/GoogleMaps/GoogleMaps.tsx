import { useMemo } from "react";
import type { FC } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";
import "./GoogleMaps.css";

type LatLngLiteral = {
    lat: number;
    lng: number;
};

interface MapProps {
    center: LatLngLiteral;
    zoom: number;
    markers: LatLngLiteral[];
    isOpen: boolean;
    toggleOpen: () => void;
}

const Map: FC<MapProps> = ({ center, zoom, markers, isOpen }) => {
    const mapContainerClassName = "map-container";
    const memoizedCenter = useMemo(() => center, [center]);
    const mapOptions = useMemo<google.maps.MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);

    return (
        <div className="my-4 ml-1 bg-transparent w-full">
            <div className={mapContainerClassName}>
                <GoogleMap
                    zoom={zoom}
                    center={memoizedCenter}
                    mapContainerClassName="w-[325px] h-50 rounded-lg shadow"
                    options={mapOptions}
                >
                    {markers.map((position, index) => (
                        <Marker key={index} position={position} />
                    ))}
                </GoogleMap>
            </div>
        </div>
    );
};

interface GoogleMapsProps {
    center?: LatLngLiteral;
    zoom?: number;
    markers?: LatLngLiteral[];
    libraries?: Libraries;
    isOpen: boolean;
    toggleOpen: () => void;
}

const GoogleMaps: FC<GoogleMapsProps> = ({
    center = { lat: -33.438370381582544, lng: -70.64886113004432 }, // Santiago, Chile
    zoom = 17,
    markers = [{ lat: -33.438370381582544, lng: -70.64886113004432 }],
    libraries = [],
    isOpen,
    toggleOpen,
}) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;


    if (!apiKey) {
        console.error("Google Maps API key not configurada. Revisa tu .env.local.");
        return <div className="text-red-500">Error: API Key no configurada</div>;
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
        language: "es",
        region: "CL",
    });

    if (loadError) {
        console.error("Error al cargar Google Maps:", loadError);
        return <div className="text-red-500">Error al cargar el mapa.</div>;
    }

    if (!isLoaded) {
        return <div>Cargando mapa...</div>;
    }

    return (
        <div className="w-full h-50 rounded-lg shadow bg-transparent flex items-center justify-center">
            {loadError ? (
                <div className="text-red-500">Error al cargar el mapa.</div>
            ) : !isLoaded ? (
                <div className="text-gray-500">Cargando mapa...</div>
            ) : (
                <Map
                    center={center}
                    zoom={zoom}
                    markers={markers}
                    isOpen={isOpen}
                    toggleOpen={toggleOpen}
                />
            )}
        </div>
    );
};

export default GoogleMaps;
