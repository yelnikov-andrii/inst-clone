import React from 'react';

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export function handleInputChange<T extends Record<string, string>>(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: Setter<T>
) {
  const { name, value } = e.target;
  setState(prev => ({
    ...prev,
    [name]: value
  }));
}