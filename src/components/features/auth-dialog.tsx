'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, LogIn, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function AuthDialog() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder logic
    setIsLoading(true);
    setError(null);
    console.log('Requesting OTP for:', phoneNumber);
    setTimeout(() => {
      // In a real app, you would call Firebase here.
      // For now, we'll just move to the next step.
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder logic
    setIsLoading(true);
    setError(null);
    console.log('Verifying OTP:', otp);
    setTimeout(() => {
      // In a real app, you would verify the OTP with Firebase.
      setIsLoading(false);
      if (otp === '123456') { // Mock success
        alert('Successfully signed in!');
        // Close dialog on success?
      } else {
        setError('Invalid OTP. Please try again.');
      }
    }, 1500);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when dialog is closed
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setIsLoading(false);
      setError(null);
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <ArrowRight className="mr-2 h-4 w-4" />
          Sign Up / Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === 'phone' ? 'Sign In with Mobile' : 'Enter OTP'}
          </DialogTitle>
          <DialogDescription>
            {step === 'phone'
              ? 'We will send you a one-time password on this mobile number.'
              : `Enter the 6-digit OTP sent to ${phoneNumber}.`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Mobile Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., 9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  One-Time Password
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify & Sign In
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => setStep('phone')}
                disabled={isLoading}
              >
                Change Number
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
