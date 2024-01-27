import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Preference {
    id: number;
    name: string;
    checked: boolean;
}

const PrefOps = () => {
    const [preferences, setPreferences] = useState<Preference[]>([]);

    useEffect(() => {
        const fetchPreferencesFromDatabase = async () => {
            // Replace this with your actual API call to fetch preferences from the database
            const response = await fetch('your-api-endpoint');
            const data = await response.json();
            
            setPreferences(data); // Assuming the response data is an array of preferences
        };

        fetchPreferencesFromDatabase();
    }, []);

    const handleCheckChange = (id: number) => {
        setPreferences((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, checked: !p.checked } : p
            )
        );
    };

    const sendPreferencesToDatabase = async () => {
        try {
            // Replace 'your-api-endpoint' with the actual endpoint to update preferences in the database
            await fetch('your-api-endpoint', {
                method: 'PUT', // or 'POST' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferences),
            });

            console.log('Preferences updated successfully');
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        sendPreferencesToDatabase();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {/* Other form fields */}
                <div className="mb-3">
                    <label className="form-label">Preferences</label>
                    <div>
                        {preferences.map((preference) => (
                            <div key={preference.id} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`preference-${preference.id}`}
                                    checked={preference.checked}
                                    onChange={() =>
                                        handleCheckChange(preference.id)
                                    }
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`preference-${preference.id}`}
                                >
                                    {preference.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default PrefOps;
