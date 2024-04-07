import React, { useEffect, useState, useMemo } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });

function FinalPage() {
  const [roles, setRoles] = useState([]);
  const [plot, setPlot] = useState([]);
  const location = useLocation();

  const participants = useMemo(() => {
    // Extracting participants from the navigation state
    return location.state ? location.state.participants : [];
  }, [location.state]);

  async function generateRolesAndPlot(participants) {
    // Construct the initial messages sent to the model, including instructions
    let messages = [
      {
        role: "system",
        content: "Create a unique role for each participant in a fictional scenario and generate a general plot. Each participant's role should complement the overall story.",
      },
    ];
  
    // Add each participant as a user message
    participants.forEach((participant, index) => {
      messages.push({ role: "user", content: `Participant #${index + 1}: ${participant.nickname}. ${participant.description}` });
    });
  
    // Add a final message to prompt for the plot
    messages.push({ role: "user", content: "What is the general plot of the story?" });
  
    try {
      // Send the completion request to OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 1024, // Adjust as needed
      });
  
      const generatedContent = completion.data.choices[0].message.content;
  
      // TODO: Process the generated content to extract individual roles and the general plot
      // This may require some parsing or additional logic depending on how the model structures its response
  
      console.log(generatedContent); // Placeholder to demonstrate output
      return generatedContent; // Or return a structured response with roles and plot
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      // Handle errors appropriately in your application context
    }
  }

  useEffect(() => {

    if (participants.length > 0) {
        generateRolesAndPlot([
            { nickname: "Alice", description: "keen observer and quick thinker" },
            { nickname: "Bob", description: "strong and courageous" },
            // Add more participants as needed
          ]);
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
