import React from 'react';
import {render} from '@testing-library/react-native';
import StatusBadge from '../StatusBadge';

describe('StatusBadge', () => {
  it('renders Not Started status correctly', () => {
    const {getByText} = render(<StatusBadge status="Not Started" />);
    expect(getByText('Not Started')).toBeTruthy();
  });

  it('renders Tx In Progress status correctly', () => {
    const {getByText} = render(<StatusBadge status="Tx In Progress" />);
    expect(getByText('Tx In Progress')).toBeTruthy();
  });

  it('renders Received status correctly', () => {
    const {getByText} = render(<StatusBadge status="Received" />);
    expect(getByText('Received')).toBeTruthy();
  });

  it('renders Submitted status correctly', () => {
    const {getByText} = render(<StatusBadge status="Submitted" />);
    expect(getByText('Submitted')).toBeTruthy();
  });

  it('renders Submitted (Amended) status correctly', () => {
    const {getByText} = render(<StatusBadge status="Submitted (Amended)" />);
    expect(getByText('Submitted (Amended)')).toBeTruthy();
  });

  it('applies correct testID when provided', () => {
    const {getByTestId} = render(
      <StatusBadge status="Not Started" testID="status-badge-test" />,
    );
    expect(getByTestId('status-badge-test')).toBeTruthy();
  });
});
