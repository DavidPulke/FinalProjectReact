import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

const useGeocode = (address: string) => {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY!,
    });
    useEffect(() => {
        if (isLoaded && address) {
            setLoading(true);
            setError("");
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                setLoading(false);
                if (status === google.maps.GeocoderStatus.OK) {
                    const location = results![0].geometry.location;
                    setCoordinates({ lat: location.lat(), lng: location.lng() });
                } else {
                    setError("Couldn't find the business Address");
                }
            });
        }
    }, [address, isLoaded]);
    return { coordinates, loading, error };
};

export default useGeocode;
