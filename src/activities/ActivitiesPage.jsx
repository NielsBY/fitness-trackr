import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";
import ActivityList from "./ActivityList.jsx";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);
  return (
    <>
      <h1>Activities</h1>
      <p>Imagine all the activities!</p>
      <ActivityList activities={activities} syncActivities={syncActivities} />
      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
