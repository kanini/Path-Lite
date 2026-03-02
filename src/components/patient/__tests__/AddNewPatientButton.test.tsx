import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddNewPatientButton from '../AddNewPatientButton';

describe('AddNewPatientButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with correct text', () => {
    const {getByText} = render(<AddNewPatientButton onPress={mockOnPress} />);
    expect(getByText('Add New')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const {getByRole} = render(<AddNewPatientButton onPress={mockOnPress} />);
    fireEvent.press(getByRole('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    const {getByRole} = render(<AddNewPatientButton onPress={mockOnPress} />);
    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Add New Patient');
  });

  it('applies testID when provided', () => {
    const {getByTestId} = render(
      <AddNewPatientButton onPress={mockOnPress} testID="add-button-test" />,
    );
    expect(getByTestId('add-button-test')).toBeTruthy();
  });
});
