interface ActivityItem {
  id: string;
  title: string;
  occurs_at: string;
}

interface Activity {
  date: string;
  activities: ActivityItem[];
}

export default Activity;
