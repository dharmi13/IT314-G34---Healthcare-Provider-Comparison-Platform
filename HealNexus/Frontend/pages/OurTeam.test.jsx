import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OurTeam from './OurTeam';
import '@testing-library/jest-dom';

describe('OurTeam Component', () => {
  beforeEach(() => {
    render(<OurTeam />);
  });

  test('renders the team header', () => {
    const headerElement = screen.getByText(/Our Team/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders all team members', () => {
    const teamMembers = [
      "Shail Patel",
      "Aditya Raina",
      "Dharmi Patel",
      "Malay Sidapara",
      "Harshit Prajapati",
      "Mihir Patel",
      "Zeel Danani",
      "Hitanshu Varia",
      "Ayush Chaudhry",
      "Prof. Saurabh Tiwary"
    ];

    teamMembers.forEach(member => {
      const memberElement = screen.getByText(member);
      expect(memberElement).toBeInTheDocument();
    });
  });

  test('renders the correct number of team members', () => {
    const teamCards = screen.getAllByRole('heading', { level: 3 });
    expect(teamCards.length).toBe(10); // There are 10 team members
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