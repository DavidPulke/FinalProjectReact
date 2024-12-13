import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";


const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY!;
const MAP_CONTAINER_STYLE = {
    width: '100%',
    height: '60%',
};

const MapComponent = ({ address }: { address: string }) => {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: MAP_API_KEY,
    });


    useEffect(() => {
        if (isLoaded && address) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const location = results![0].geometry.location;
                    setCoordinates({ lat: location.lat(), lng: location.lng() });
                }
            });
        }
    }, [address, isLoaded]);


    useEffect(() => {
        if (isLoaded && coordinates) {
            const mapDiv = document.getElementById('map');
            if (mapDiv) {
                const map = new google.maps.Map(mapDiv, {
                    center: coordinates,
                    zoom: 10,
                });


                const marker = new google.maps.Marker({
                    position: coordinates,
                    map,
                    title: 'Business Location',
                });

                setIsMapLoaded(true);
            }
        }
    }, [coordinates, isLoaded]);

    if (!isLoaded || !coordinates) return <div style={{ height: 500 }}><h4 className="text-danger
    m-5">No Address Found :/ </h4></div>;
    return (
        <div id="map" style={MAP_CONTAINER_STYLE} />
    );
};

export default MapComponent;
