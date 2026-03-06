import { useRef, useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: { lat: number; lng: number; name: string }) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}

const PlacesAutocomplete = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder,
  className = "",
  icon,
}: PlacesAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || "",
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current || !apiKey || loadError) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["(cities)"],
      fields: ["geometry", "name", "formatted_address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.formatted_address || place.name || "";

        onChange(name);

        if (onPlaceSelect) {
          onPlaceSelect({ lat, lng, name });
        }
      }
    });

    autocompleteRef.current = autocomplete;

    const pacContainer = document.querySelector(".pac-container") as HTMLElement;
    if (pacContainer) {
      pacContainer.style.backgroundColor = "#FDF5E6";
      pacContainer.style.border = "1px solid #002147";
      pacContainer.style.borderRadius = "8px";
      pacContainer.style.marginTop = "4px";
      pacContainer.style.boxShadow = "0 4px 6px -1px rgba(0, 33, 71, 0.1), 0 2px 4px -1px rgba(0, 33, 71, 0.06)";
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, apiKey, loadError, onChange, onPlaceSelect]);

  useEffect(() => {
    if (!isLoaded || !apiKey || loadError) return;

    const style = document.createElement("style");
    style.textContent = `
      .pac-container {
        background-color: #FDF5E6 !important;
        border: 1px solid #002147 !important;
        border-radius: 8px !important;
        margin-top: 4px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 33, 71, 0.1), 0 2px 4px -1px rgba(0, 33, 71, 0.06) !important;
        font-family: 'DM Sans', system-ui, sans-serif !important;
        z-index: 9999 !important;
      }
      .pac-item {
        background-color: #FDF5E6 !important;
        color: #002147 !important;
        padding: 8px 12px !important;
        cursor: pointer !important;
        border-top: 1px solid rgba(0, 33, 71, 0.1) !important;
        font-size: 14px !important;
      }
      .pac-item:first-child {
        border-top: none !important;
      }
      .pac-item:hover {
        background-color: rgba(0, 33, 71, 0.05) !important;
      }
      .pac-item-selected {
        background-color: rgba(0, 33, 71, 0.08) !important;
      }
      .pac-item-query {
        color: #002147 !important;
        font-weight: 600 !important;
      }
      .pac-matched {
        color: #002147 !important;
        font-weight: 700 !important;
      }
      .pac-icon {
        display: none !important;
      }
      .pac-logo:after {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isLoaded, apiKey, loadError]);

  return (
    <div className="flex items-center gap-3">
      {icon && <div className="shrink-0">{icon}</div>}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
    </div>
  );
};

export default PlacesAutocomplete;
