/* eslint-disable no-nested-ternary */
import React from 'react';
import ReactSelect from 'react-select';

interface SelectProps {
  options:
  {
    value: string;
    label: string;
  }[];
  defaultValue: string;

}

const Select: React.FC<SelectProps> = ({ options, defaultValue }) => {

  return (
    <ReactSelect
      styles={
        {
          control: styles => (
            {
              ...styles,
              backgroundColor: 'var(--input-background-color)',
              width: 400,
              borderColor: 'var(--input-background-color)',
              marginTop: 8,
              borderRadius: 10,
              height: 56,
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
            }
          )

        }
      }
      options={options}
      defaultValue={{ value: '', label: defaultValue }}
    />
  )
};

export default Select;
