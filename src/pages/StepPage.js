// StepPage.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RadioButtonStep from '../components/RadioButtonStep';

const initialSteps = [
    { 
      type: 'radio', 
      question: "Choose the setting of your story:", 
      options: [
        { label: "Secluded Mansion", value: "mansion" },
        { label: "Victorian House", value: "victorian_house" },
        { label: "Cruise Ship", value: "cruise_ship" },
        { label: "Castle", value: "castle" },
        { label: "Historic Hotel", value: "historic_hotel" },
        { label: "Private Island", value: "private_island" },
        { label: "Vineyard Estate", value: "vineyard_estate" },
        { label: "Abandoned Theater", value: "abandoned_theater" },
        { label: "Members' Club", value: "members_club" },
        { label: "Mysterious Library", value: "mysterious_library" },
        { label: "Custom...", value: "custom" }
      ] 
    },
    { 
        type: 'text', 
        question: "How many partecipants?"
      },
    { 
        type: 'text', 
        question: "Adding some other details?" 
      },
  ];

function StepPage() {
    const [steps, setSteps] = useState(initialSteps);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState(Array(initialSteps.length).fill(''));
    const [selectedOption, setSelectedOption] = useState('');
    const [customText, setCustomText] = useState('');
    const [prevParticipantCount, setPrevParticipantCount] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
        const participantCount = parseInt(answers[1], 10); // Assuming index 1 is where participant count is stored
        if (!isNaN(participantCount) && participantCount !== prevParticipantCount) {
          const newSteps = [...initialSteps];
          const participantSteps = [];
      
          for (let i = 0; i < participantCount; i++) {
            participantSteps.push({
              type: 'participant',
              question: `Details of participant ${i + 1}:`
            });
          }
      
          newSteps.splice(2, 0, ...participantSteps);
          setSteps(newSteps);
          setAnswers((prevAnswers) => [
            ...prevAnswers.slice(0, 2),
            ...Array(participantCount).fill({ nickname: '', description: '' }),
            ...prevAnswers.slice(2)
          ]);
          setPrevParticipantCount(participantCount);
        }
      }, [answers, prevParticipantCount]);

      const handleNext = () => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          navigate('/final', { state: { participants: answers } });
        }
      };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (event, stepIndex, fieldType = '') => {
    setAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        // If the change is for a participant step
        if (fieldType) {
            const updatedValue = { ...updatedAnswers[stepIndex], [fieldType]: event.target.value };
            updatedAnswers[stepIndex] = updatedValue;
        } else {
            // Handle changes for other text inputs
            updatedAnswers[stepIndex] = event.target.value;
        }
        return updatedAnswers;
    });
};

  

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value !== 'custom') {
      setCustomText('');
    }
    // Update the answer for the current step
    const newAnswers = [...answers];
    newAnswers[currentStep] = e.target.value === 'custom' ? customText : e.target.value;
    setAnswers(newAnswers);
  };

  const handleCustomTextChange = (e) => {
    setCustomText(e.target.value);
    setSelectedOption('custom');
    // Update the answer for the current step
    const newAnswers = [...answers];
    newAnswers[currentStep] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleFinish = () => {
    // Structure participants' data if needed
    navigate('/final', { state: { participants: answers.filter(answer => typeof answer === 'object') } });
  };

  const renderStepContent = (step, stepIndex) => {
    switch(step.type) {
        case 'text':
            return (
                <TextField
                    label="Your Answer"
                    variant="outlined"
                    value={answers[stepIndex]}
                    onChange={(e) => handleInputChange(e, stepIndex)}
                    sx={{ mb: 2, minWidth: '300px' }}
                />
            );
        case 'participant':
            const participantAnswer = answers[stepIndex] || { nickname: '', description: '' };
            return (
                <>
                    <TextField
                        label="Nickname"
                        variant="outlined"
                        value={participantAnswer.nickname}
                        onChange={(e) => handleInputChange(e, stepIndex, 'nickname')}
                        sx={{ mb: 1, minWidth: '300px' }}
                    />
                    <TextField
                        label="Short personality description (optional)"
                        variant="outlined"
                        value={participantAnswer.description}
                        onChange={(e) => handleInputChange(e, stepIndex, 'description')}
                        sx={{ mb: 2, minWidth: '300px' }}
                    />
                </>
            );
        case 'radio':
            return (
                <RadioButtonStep
                    selectedOption={selectedOption}
                    handleChange={(e) => handleRadioChange(e, stepIndex)}
                    customText={customText}
                    handleCustomTextChange={handleCustomTextChange}
                    options={step.options}
                />
            );
        default:
            return null;
    }
};

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', // This centers content vertically
        alignItems: 'center', // This centers content horizontally
        height: '100vh', // Adjust as necessary to fit your design
        width: '100%',
        p: 4 // Padding, adjust as necessary
      }}
    >
      <Typography variant="h4" gutterBottom>
        {steps[currentStep].question}
      </Typography>
      {renderStepContent(steps[currentStep], currentStep)}
      <Box
        sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%', 
            maxWidth: '400px', 
            mt: 2
        }}
        >
        <Button
            variant="contained"
            disabled={currentStep === 0}
            onClick={handleBack}
        >
            Previous
        </Button>
        {currentStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleFinish}>Finish</Button>
            ) : (
            <Button variant="contained" onClick={handleNext}>Next</Button>
            )}
        </Box>
    </Box>
  );
}

export default StepPage;
