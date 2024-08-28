const fs = require('fs');
const path = require('path');

const responsesFilePath = path.resolve(__dirname, 'responses.json');

// Load existing responses from the JSON file
function loadResponses() {
    if (fs.existsSync(responsesFilePath)) {
        const data = fs.readFileSync(responsesFilePath, 'utf8');
        return JSON.parse(data);
    } else {
        return { responses: [] };
    }
}

// Save responses to the JSON file
function saveResponses(data) {
    fs.writeFileSync(responsesFilePath, JSON.stringify(data, null, 2));
}

exports.handler = async (event) => {
    const method = event.httpMethod;
    let responses = loadResponses();

    if (method === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify(responses),
        };
    } else if (method === 'POST') {
        const newResponse = JSON.parse(event.body);
        responses.responses.push(newResponse);
        saveResponses(responses);

        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'success' }),
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
};
