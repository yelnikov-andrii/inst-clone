import React from 'react';

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export function handleInputChange<any>(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: Setter<T>
) {
  const { name, value } = e.target;
  setState((prev: any) => ({
    ...prev,
    [name]: value
  }));
}