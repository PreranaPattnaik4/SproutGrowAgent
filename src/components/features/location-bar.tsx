'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  Cloudy,
  Sun,
  Banknote,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Location = {
  latitude: number;
  longitude: number;
} | null;

// Mock data
const marketPrices = [
  { name: 'Tomatoes', price: '₹25/kg' },
  { name: 'Potatoes', price: '₹15/kg' },
  { name: 'Onions', price: '₹20/kg' },
  { name: 'Wheat', price: '₹2200/q' },
];

const weatherForecast = [
  { day: 'Today', temp: '32°C', icon: Sun },
  { day: 'Tmw', temp: '30°C', icon: Cloudy },
];

export function LocationBar() {
  const [location, setLocation] = useState<Location>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setError('Location access denied.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported.');
      setLoading(false);
    }
  }, []);

  return (
    <section className="bg-muted/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground md:justify-between">
          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Fetching location...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          {!loading && !error && location && (
            <>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  Lat: {location.latitude.toFixed(2)}, Lon:{' '}
                  {location.longitude.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Banknote className="h-4 w-4 text-primary" />
                  <span>Prices:</span>
                </div>
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span>{item.name}:</span>
                    <span className="font-semibold text-foreground">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Cloudy className="h-4 w-4 text-primary" />
                  <span>Weather:</span>
                </div>
                {weatherForecast.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <item.icon className="h-4 w-4" />
                    <span>{item.day}:</span>
                    <span className="font-semibold text-foreground">
                      {item.temp}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
