import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import EmptyPatientState from '../EmptyPatientState';

describe('EmptyPatientState', () => {
  const mockOnAddNew = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state message', () => {
    const {getByText} = render(<EmptyPatientState />);
    expect(
      getByText("No patients found. Tap 'Add New' to create a patient."),
    ).toBeTruthy();
  });

  it('renders Add New button when onAddNew is provided', () => {
    const {getByText} = render(<EmptyPatientState onAddNew={mockOnAddNew} />);
    expect(getByText('Add New')).toBeTruthy();
  });

  it('does not render Add New button when onAddNew is not provided', () => {
    const {queryByText} = render(<EmptyPatientState />);
    expect(queryByText('Add New')).toBeNull();
  });

  it('calls onAddNew when button is pressed', () => {
    const {getByTestId} = render(<EmptyPatientState onAddNew={mockOnAddNew} />);
    fireEvent.press(getByTestId('empty-state-add-button'));
    expect(mockOnAddNew).toHaveBeenCalledTimes(1);
  });

  it('applies testID when provided', () => {
    const {getByTestId} = render(
      <EmptyPatientState testID="empty-state-test" />,
    );
    expect(getByTestId('empty-state-test')).toBeTruthy();
  });
});
