import React, { useEffect, useState, useMemo } from 'react';
import { Box, List, ListItem, Card, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';

function FinalPage() {
  const [roles, setRoles] = useState([]);
  const [plot, setPlot] = useState([]);
  const location = useLocation();

  const [settingPlot, participants] = useMemo(() => {
    const state = location.state || {};
    const setting = state.setting || '';
    const participants = state.participants || [];

    return [setting, participants];
  }, [location.state]);

  useEffect(() => {

    async function generateRolesAndPlot(participants) {
        const functions = getFunctions(); // Initialize Firebase Functions
        const generateMysteryPlot = httpsCallable(functions, 'generateMysteryPlot');
        // Construct the initial messages sent to the model, including instructions
        let messages = [
          {
            role: "system",
            content: `
            Objective:
            Craft a murder mystery dinner plot with specific roles and objectives for each guest, 
            ensuring their actions and motives are clear and directly influence the unfolding of the story.
            
            Output Format is a json like:
            {
                "roles": [
                  {
                    "user": "Name of the Participant",
                    "card": {
                      "background": "Brief background relevant to the murder mystery context.",
                      "objective": "Specific, actionable objective that guides the participant's actions.",
                      "secret": "A personal secret, a wrongdoing/secret relationship that adds depth to the character and motivates their actions.",
                      "item": "An item or piece of information they possess or seek, pivotal to their objectives."
                    }
                  }
                  // Additional roles follow the same structure
                ],
                "plot": "A focused, actionable plot that sets the stage for the mystery and outlines the key event – the murder – around which all characters' objectives orbit. It should provide the necessary setup for the characters' interactions, secrets, and objectives to intertwine and drive the narrative towards solving the murder."
              }

            Example, but invent something new:

            {
                "roles": [
                  {
                    "user": "Giulio",
                    "card": {
                      "background": "Host of the dinner party, known for a love of rare artifacts.",
                      "objective": "Ensure the safety of the prized artifact displayed tonight.",
                      "secret": "The artifact is a fake; the real one was stolen a week ago.",
                      "item": "A mysterious key to a hidden vault within the mansion."
                    }
                  },
                  {
                    "user": "Mariana",
                    "card": {
                      "background": "A renowned art historian and Giulio's old friend.",
                      "objective": "Uncover the truth about the artifact's authenticity.",
                      "secret": "Mariana suspects the artifact is a fake and knows who might be the thief.",
                      "item": "A letter from an anonymous source hinting at the artifact's history."
                    }
                  }
                  // Additional roles with similarly detailed objectives and items
                ],
                "plot": "During a stormy evening at a grand mansion, a dinner party turns into a scene of a crime when the host, Giulio, 
                reveals the mansion's original owner was murdered decades ago, and the case was never solved.
                 Tonight, the unveiling of a rare artifact rumored to be connected to the unsolved murder draws attention. 
                 However, the artifact goes missing, and the guests are thrust into a web of deceit as they navigate through secrets, 
                 betrayals, and hidden motives to uncover the thief among them and solve the ancient murder mystery."
              }
              
            
             The setting of the story is `+settingPlot,
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
          const result = await generateMysteryPlot({ messages });
          console.log("ECCOCI")
          console.log(result);
          const { roles, plot } = result.data;

          setRoles(roles);
          setPlot(plot);
        } catch (error) {
          console.error("Error calling OpenAI:", error);
        }
      }

    if (participants.length > 0) {
        generateRolesAndPlot(participants);
    }
  }, [participants]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, width: '100%' }}>
      <List
        sx={{
          width: '100%',
          maxHeight: 'calc(100vh - 64px)', 
          overflowY: 'auto',
        }}
      >
        {/* Plot as the first list item */}
        <ListItem>
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
          <b>General Plot</b>: {plot}
          </Typography>
        </ListItem>

        {/* Roles as subsequent list items */}
        {roles.map((roleEntry, index) => (
          <ListItem key={index} alignItems="flex-start">
            <Card sx={{ width: '100%'}}>
              <CardContent>
                <Typography variant="h5" component="div" color="text.cardTitle">
                  {roleEntry.user || "Unknown Participant"}
                </Typography>
                <Typography variant="body2" color="text.cardTitle">
                  <b>Background:</b> {roleEntry.card.background}
                </Typography>
                <Typography variant="body2" color="text.cardTitle">
                  <b>Objective:</b> {roleEntry.card.objective}
                </Typography>
                <Typography variant="body2" color="text.cardTitle">
                  <b>Secret:</b> {roleEntry.card.secret}
                </Typography>
                <Typography variant="body2" color="text.cardTitle">
                <b>Item:</b> {roleEntry.card.item}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
  
export default FinalPage;
