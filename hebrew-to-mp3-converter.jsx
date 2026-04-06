import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const HebrewToMp3Converter = () => {
    const [hebrewText, setHebrewText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const convertToMp3 = async () => {
        // Call a text-to-speech API or library to convert the Hebrew text to audio
        const response = await fetch('https://api.text-to-speech.yourservice.com/convert', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text: hebrewText, language: 'he' })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            saveAs(blob, 'hebrew_audio.mp3'); // Initiates a download
        } else {
            console.error('Conversion failed', response);
        }
    };

    return (
        <div>
            <h1>Hebrew to MP3 Converter</h1>
            <textarea
                value={hebrewText}
                onChange={(e) => setHebrewText(e.target.value)}
                placeholder="Enter Hebrew text here"
                rows="10"
                cols="30"
            ></textarea>
            <br />
            <button onClick={convertToMp3}>Convert to MP3</button>
            <audio
                controls
                src={audioUrl}
                style={{ display: audioUrl ? 'block' : 'none' }}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default HebrewToMp3Converter;