'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Loader2,
  MapPin,
  Cloudy,
  Sun,
  Building2,
  Banknote,
} from 'lucide-react';

type Location = {
  latitude: number;
  longitude: number;
} | null;

// Mock data
const marketPrices = [
  { name: 'Tomatoes', price: '₹25/kg' },
  { name: 'Potatoes', price: '₹15/kg' },
  { name: 'Onions', price: '₹20/kg' },
  { name: 'Wheat', price: '₹2200/quintal' },
];

const weatherForecast = [
  { day: 'Today', temp: '32°C', condition: 'Sunny', icon: Sun },
  { day: 'Tomorrow', temp: '30°C', condition: 'Partly Cloudy', icon: Cloudy },
  { day: 'Day after', temp: '29°C', condition: 'Cloudy', icon: Cloudy },
];

const governmentSchemes = [
  {
    name: 'PM-KISAN Scheme',
    description: 'Financial support for small and marginal farmers.',
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme.',
  },
  {
    name: 'Kisan Credit Card (KCC)',
    description: 'Provides credit for farming needs.',
  },
];

export function LocationInfoDisplay() {
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
        (error) => {
          setError(`Error: ${error.message}. Please enable location services.`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Fetching your location...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <MapPin /> Your Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          {location ? (
            <p>
              Latitude: {location.latitude.toFixed(4)}, Longitude:{' '}
              {location.longitude.toFixed(4)}
            </p>
          ) : (
            <p>Location not available.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Cloudy /> Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weatherForecast.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{item.day}</span>
                </div>
                <span>
                  {item.temp}, {item.condition}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Banknote /> Local Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {marketPrices.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-muted/50 p-2"
              >
                <span>{item.name}</span>
                <span className="font-semibold">{item.price}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Building2 /> Eligible Government Schemes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {governmentSchemes.map((scheme, index) => (
            <div key={index} className="rounded-md border p-3">
              <h3 className="font-semibold">{scheme.name}</h3>
              <p className="text-sm text-muted-foreground">
                {scheme.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
