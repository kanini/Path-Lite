import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PatientCard from '../PatientCard';

describe('PatientCard', () => {
  const mockOnPress = jest.fn();
  const mockDate = new Date('2024-03-01T10:00:00Z');

  const defaultProps = {
    firstName: 'John',
    lastName: 'Doe',
    mrn: 'MRN001',
    status: 'Not Started' as const,
    lastUpdated: mockDate,
    onPress: mockOnPress,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders patient name correctly', () => {
    const {getByText} = render(<PatientCard {...defaultProps} />);
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('renders MRN correctly', () => {
    const {getByText} = render(<PatientCard {...defaultProps} />);
    expect(getByText('MRN: MRN001')).toBeTruthy();
  });

  it('renders status badge', () => {
    const {getByText} = render(<PatientCard {...defaultProps} />);
    expect(getByText('Not Started')).toBeTruthy();
  });

  it('calls onPress when card is tapped', () => {
    const {getByTestId} = render(
      <PatientCard {...defaultProps} testID="patient-card" />,
    );
    fireEvent.press(getByTestId('patient-card'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders timestamp correctly for recent updates', () => {
    const recentDate = new Date(Date.now() - 5 * 60000);
    const {getByText} = render(
      <PatientCard {...defaultProps} lastUpdated={recentDate} />,
    );
    expect(getByText('5m ago')).toBeTruthy();
  });

  it('has proper accessibility attributes', () => {
    const {getByRole} = render(<PatientCard {...defaultProps} />);
    const button = getByRole('button');
    expect(button).toBeTruthy();
  });
});
