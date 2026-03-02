import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PatientListTabs from '../PatientListTabs';

describe('PatientListTabs', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both tabs', () => {
    const {getByText} = render(
      <PatientListTabs
        activeTab="my-patients"
        onTabChange={mockOnTabChange}
      />,
    );
    expect(getByText('My Patients')).toBeTruthy();
    expect(getByText('All Patients')).toBeTruthy();
  });

  it('highlights active tab correctly', () => {
    const {getByTestId} = render(
      <PatientListTabs
        activeTab="my-patients"
        onTabChange={mockOnTabChange}
      />,
    );
    const myPatientsTab = getByTestId('tab-my-patients');
    expect(myPatientsTab.props.accessibilityState.selected).toBe(true);
  });

  it('calls onTabChange when My Patients tab is pressed', () => {
    const {getByTestId} = render(
      <PatientListTabs
        activeTab="all-patients"
        onTabChange={mockOnTabChange}
      />,
    );
    fireEvent.press(getByTestId('tab-my-patients'));
    expect(mockOnTabChange).toHaveBeenCalledWith('my-patients');
  });

  it('calls onTabChange when All Patients tab is pressed', () => {
    const {getByTestId} = render(
      <PatientListTabs
        activeTab="my-patients"
        onTabChange={mockOnTabChange}
      />,
    );
    fireEvent.press(getByTestId('tab-all-patients'));
    expect(mockOnTabChange).toHaveBeenCalledWith('all-patients');
  });

  it('has proper accessibility attributes', () => {
    const {getByTestId} = render(
      <PatientListTabs
        activeTab="my-patients"
        onTabChange={mockOnTabChange}
      />,
    );
    const tab = getByTestId('tab-my-patients');
    expect(tab.props.accessibilityRole).toBe('tab');
  });
});
