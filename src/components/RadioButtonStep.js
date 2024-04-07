// RadioButtonStep.js
import React from 'react';
import { RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';

const RadioButtonStep = ({ selectedOption, handleChange, customText, handleCustomTextChange, options }) => (
  <RadioGroup value={selectedOption} onChange={handleChange}>
    {options.map((option) => (
      option.value === 'custom'
        ? <FormControlLabel 
            key={option.value}
            value={option.value} 
            control={<Radio />} 
            label={
              <TextField
                disabled={selectedOption !== 'custom'}
                value={customText}
                onChange={handleCustomTextChange}
                placeholder="Custom Text"
              />
            } 
          />
        : <FormControlLabel 
            key={option.value}
            value={option.value} 
            control={<Radio />} 
            label={option.label} 
          />
    ))}
  </RadioGroup>
);

export default RadioButtonStep;