import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutUs from './AboutUs';
import '@testing-library/jest-dom';

describe('AboutUs Component', () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  test('renders the About Us header', () => {
    const headerElement = screen.getByText(/About Heal Nexus/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the about us description', () => {
    const descriptionElement = screen.getByText(/The Healthcare Provider Comparison Platform is designed to help patients efficiently compare and choose healthcare providers/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders the key features section', () => {
    const keyFeaturesHeader = (screen.getAllByText(/Key Features of Heal Nexus/i))[0];
    expect(keyFeaturesHeader).toBeInTheDocument();

    const keyFeaturesList = [
      "Login & Registration",
      "Search Specialists",
      "Book Appointments",
      "Provide Reviews",
      "Order Medicine",
      "Manage Appointments",
      "Prescription Management",
      "Manage Users & Specialists",
      "Emergency Services",
      "Report Generation",
      "Payment System"
    ];

    keyFeaturesList.forEach(feature => {
      const featureElement = (screen.getAllByText(new RegExp(feature, 'i')))[0];
      expect(featureElement).toBeInTheDocument();
    });
  });

  test('renders the Go Back button', () => {
    const buttonElement = screen.getByRole('button', { name: /Go Back to Home Page/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('navigates to home page when Go Back button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: /Go Back to Home Page/i });

    // Mock window.location.href
    delete window.location;
    window.location = { href: '' };

    fireEvent.click(buttonElement);
    expect(window.location.href).toBe('/');
  });
});