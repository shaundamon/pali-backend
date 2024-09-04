# Palesa Humanoid Robot

This is an AI-powered assistant application built with FastAPI, OpenAI, and FAISS. It provides features such as document uploading, querying, audio transcription, and text-to-speech conversion.

## Prerequisites

- Python 3.8+

## Installation

1. Clone the repository:

```bash
git clone https://github.com/{yourusername}/palesa-robot.git
cd ai-assistant-app
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:

- On Windows:
  ```bash
  source venv\Scripts\activate || venv/Scripts/activate
  ```
- On macOS and Linux:
  ```bash
  source venv/bin/activate
  ```

4. Install the required packages:
```bash
pip install -r requirements.txt
```

## Configuration
1. Create a `.env` file in the root directory of the project:
```bash
touch .env
```

2. Open the `.env` file and add your OpenAI API key:
```python
OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

## Running the Application
1. Ensure you're in the project root directory and your virtual environment is activated.

2. Start the FastAPI server:
```bash
python main.py
```
The server will start running on `http://0.0.0.0:8000`.

3. You can now access the API documentation and test the endpoints by opening `http://localhost:8000/docs` in your web browser.

## API Endpoints

- `/upload`: Upload documents or website content for indexing.
- `/transcribe`: Transcribe audio files to text.
- `/text_to_speech`: Convert text to speech.
- `/chat`: Query Palesa the ai assistant based on uploaded documents.

For detailed information about request/response formats, refer to the API documentation at `/docs`.

## Development

- The main application code is located in the `app/` directory.
- Configuration settings are in `config.py`.
- The entry point of the application is `main.py`.

