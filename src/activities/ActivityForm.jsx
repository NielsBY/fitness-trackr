import { useState } from "react";
import { createActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityForm({ syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryCreateActivity = async (formData) => {
    setError(null);

    const name = formData.get("name");
    const description = formData.get("description");

    try {
      await createActivity(token, { name, description });
      await syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add New Activity</h2>
      <form action={tryCreateActivity}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Description:
          <textarea name="description" />
        </label>
        <button type="submit">Add Activity</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
