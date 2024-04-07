import React, { useEffect, useState, useMemo } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

function FinalPage() {
  const [roles, setRoles] = useState([]);
  const location = useLocation();

  const participants = useMemo(() => {
    // Extracting participants from the navigation state
    return location.state ? location.state.participants : [];
  }, [location.state]);

  useEffect(() => {
    const generateRoles = async () => {
      // Simulating role assignment, replace with your logic
      const mockApiResponse = participants.map((participant, index) => ({
        ...participant,
        role: `Role #${index + 1}` // Example dynamic role assignment
      }));
      setRoles(mockApiResponse);
    };

    if (participants.length > 0) {
      generateRoles();
    }
  }, [participants]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {roles.map((participant, index) => (
        <Card key={index} sx={{ minWidth: 275, mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: 'text.cardTitle' }}>
              {participant.nickname || "Participant"}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {participant.description || "No description provided"}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.cardTitle' }}>
              Role: {participant.role}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FinalPage;
