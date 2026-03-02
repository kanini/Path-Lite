import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TreatmentTypeSelector from '../TreatmentTypeSelector';

describe('TreatmentTypeSelector', () => {
  const mockOnSelect = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when visible is true', () => {
    const {getByText} = render(
      <TreatmentTypeSelector
        visible={true}
        onSelect={mockOnSelect}
        onCancel={mockOnCancel}
      />,
    );
    expect(getByText('Select Treatment Type')).toBeTruthy();
  });

  it('renders Hemodialysis option', () => {
    const {getByText} = render(
      <TreatmentTypeSelector
        visible={true}
        onSelect={mockOnSelect}
        onCancel={mockOnCancel}
      />,
    );
    expect(getByText('Hemodialysis')).toBeTruthy();
  });

  it('calls onSelect when treatment type is selected', () => {
    const {getByTestId} = render(
      <TreatmentTypeSelector
        visible={true}
        onSelect={mockOnSelect}
        onCancel={mockOnCancel}
      />,
    );
    fireEvent.press(getByTestId('treatment-type-hemodialysis'));
    expect(mockOnSelect).toHaveBeenCalledWith('Hemodialysis');
  });

  it('calls onCancel when cancel button is pressed', () => {
    const {getByTestId} = render(
      <TreatmentTypeSelector
        visible={true}
        onSelect={mockOnSelect}
        onCancel={mockOnCancel}
      />,
    );
    fireEvent.press(getByTestId('treatment-type-cancel'));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes for options', () => {
    const {getByTestId} = render(
      <TreatmentTypeSelector
        visible={true}
        onSelect={mockOnSelect}
        onCancel={mockOnCancel}
      />,
    );
    const option = getByTestId('treatment-type-hemodialysis');
    expect(option.props.accessibilityRole).toBe('button');
    expect(option.props.accessibilityLabel).toBe('Select Hemodialysis');
  });
});
