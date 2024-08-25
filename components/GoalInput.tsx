import React, { useState } from 'react';
import { useStore } from '../utils/store';
import { createGoal } from '../utils/api';

const GoalInput: React.FC = () => {
  const { user, addGoal } = useStore();
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!goal.trim()) {
      setError('Goal cannot be empty');
      return;
    }

    try {
      const newGoal = await createGoal(goal, user.id);
      addGoal(newGoal);
      setGoal('');
    } catch (err) {
      console.error('Error creating goal:', err);
      setError('Failed to create goal. Please try again.');
    }
  };

  return (
    <div className="goal-input">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={goal}
          onChange={handleInputChange}
          placeholder="Enter your fitness goal"
          className="p-2 border border-gray-400 rounded mb-2"
        />
        {error && <span className="text-red-500">{error}</span>}
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded"
          disabled={!user}
        >
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default GoalInput;