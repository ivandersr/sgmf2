/* eslint-disable no-nested-ternary */
import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import ReactSelect from 'react-select';
import { Container, Error } from './styles';

interface SelectProps {
  name: string;
  options:
  {
    value: string;
    label: string;
  }[];
  defaultOption: string;
}

const Select: React.FC<SelectProps> = ({ name, options, defaultOption }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container hasError={!!error}>
      <ReactSelect
        ref={selectRef}
        styles={
          {
            control: styles => (
              {
                ...styles,
                backgroundColor: 'var(--input-background-color)',
                width: 400,
                borderColor: 'var(--input-background-color)',
                borderRadius: 10,
                height: 56,
                border: 0,
              }
            ),
            option: styles => (
              {
                ...styles,
                color: 'var(--input-placeholder-color)'
              }
            ),
            input: styles => (
              {
                ...styles,
              }
            ),
            placeholder: styles => (
              {
                ...styles,
                color: 'var(--input-placeholder-color)',
              }
            ),
            singleValue: styles => (
              {
                ...styles,
                color: 'var(--input-text-color)',
              }
            )

          }
        }
        options={options}
        defaultOption={{ value: '', label: defaultOption }}
        defaultValue={defaultValue}
        name={name}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  )
};

export default Select;
