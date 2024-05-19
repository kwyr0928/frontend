// 個人画面 main
import { useEffect, useState } from "react";
import axios from "axios";
let haikei = "/src/assets/haikei.png";
import Goal from "./Goal";

function PersonalMain() {
  const [userId, setUserId] = useState(null);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const user_id = "Ub2aef8986975500e8ee10a67f6ec3b37";
      setUserId(user_id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      // user_idに基づいて目標を取得する
      const fetchGoals = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:80/user_goals`, {
            params: { user_id: userId },
          });
          setGoals(response.data);
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      };

      fetchGoals();
    }
  }, [userId]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${haikei})` }}
    >
      {goals.map((goal) => (
        <div key={goal.goal_id}>
          <Goal
            name={goal.name}
            description={goal.description}
            start_date={goal.start_date}
            end_date={goal.end_date}
          />
        </div>
      ))}
    </div>
  );
}

export default PersonalMain;
