/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const OpenAI = require('openai');
const OPENAI_API_KEY = functions.config().openai.key; // Ensure you set this in your Firebase config

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

exports.generateMysteryPlot = functions.https.onCall(async (data, context) => {
    // You might want to verify authentication
    // if (context.auth.uid) { ... }

    const { messages } = data;

    // Attempt to call OpenAI with constructed messages
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: messages,
            response_format: { "type": "json_object" },
            temperature: 1.2,
        });

        const generatedContent = completion.choices[0].message.content;
        return JSON.parse(generatedContent);
    } catch (error) {
        logger.error("Error calling OpenAI:", error);
        throw new functions.https.HttpsError('unknown', 'Failed to generate plot', error);
    }
});