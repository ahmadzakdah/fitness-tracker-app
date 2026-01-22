/**
 * Fitness Tracker Context
 * Global state management for workouts, check-ins, and daily goals
 */

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Workout, CheckIn, DailyGoal } from "./types";
import { workoutStorage, checkInStorage, dailyGoalStorage } from "./storage";

interface FitnessState {
  workouts: Workout[];
  checkIns: CheckIn[];
  dailyGoal: DailyGoal;
  loading: boolean;
  error: string | null;
}

type FitnessAction =
  | { type: "SET_WORKOUTS"; payload: Workout[] }
  | { type: "ADD_WORKOUT"; payload: Workout }
  | { type: "UPDATE_WORKOUT"; payload: Workout }
  | { type: "DELETE_WORKOUT"; payload: string }
  | { type: "SET_CHECK_INS"; payload: CheckIn[] }
  | { type: "ADD_CHECK_IN"; payload: CheckIn }
  | { type: "SET_DAILY_GOAL"; payload: DailyGoal }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: FitnessState = {
  workouts: [],
  checkIns: [],
  dailyGoal: { targetMinutes: 30, targetCalories: 500 },
  loading: true,
  error: null,
};

function fitnessReducer(state: FitnessState, action: FitnessAction): FitnessState {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload, loading: false };
    case "ADD_WORKOUT":
      return { ...state, workouts: [...state.workouts, action.payload] };
    case "UPDATE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.map((w) => (w.id === action.payload.id ? action.payload : w)),
      };
    case "DELETE_WORKOUT":
      return { ...state, workouts: state.workouts.filter((w) => w.id !== action.payload) };
    case "SET_CHECK_INS":
      return { ...state, checkIns: action.payload };
    case "ADD_CHECK_IN":
      return { ...state, checkIns: [...state.checkIns, action.payload] };
    case "SET_DAILY_GOAL":
      return { ...state, dailyGoal: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

interface FitnessContextType extends FitnessState {
  addWorkout: (workout: Omit<Workout, "id">) => Promise<void>;
  updateWorkout: (id: string, updates: Partial<Workout>) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  addCheckIn: (checkIn: Omit<CheckIn, "id">) => Promise<void>;
  setDailyGoal: (goal: DailyGoal) => Promise<void>;
  refresh: () => Promise<void>;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export function FitnessProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(fitnessReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const [workouts, checkIns, dailyGoal] = await Promise.all([
        workoutStorage.getAll(),
        checkInStorage.getAll(),
        dailyGoalStorage.get(),
      ]);

      dispatch({ type: "SET_WORKOUTS", payload: workouts });
      dispatch({ type: "SET_CHECK_INS", payload: checkIns });
      dispatch({ type: "SET_DAILY_GOAL", payload: dailyGoal });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to load data",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function addWorkout(workout: Omit<Workout, "id">) {
    try {
      const newWorkout = await workoutStorage.add(workout);
      dispatch({ type: "ADD_WORKOUT", payload: newWorkout });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to add workout",
      });
      throw error;
    }
  }

  async function updateWorkout(id: string, updates: Partial<Workout>) {
    try {
      const updated = await workoutStorage.update(id, updates);
      if (updated) {
        dispatch({ type: "UPDATE_WORKOUT", payload: updated });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to update workout",
      });
      throw error;
    }
  }

  async function deleteWorkout(id: string) {
    try {
      await workoutStorage.delete(id);
      dispatch({ type: "DELETE_WORKOUT", payload: id });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to delete workout",
      });
      throw error;
    }
  }

  async function addCheckIn(checkIn: Omit<CheckIn, "id">) {
    try {
      const newCheckIn = await checkInStorage.add(checkIn);
      dispatch({ type: "ADD_CHECK_IN", payload: newCheckIn });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to add check-in",
      });
      throw error;
    }
  }

  async function setDailyGoal(goal: DailyGoal) {
    try {
      await dailyGoalStorage.set(goal);
      dispatch({ type: "SET_DAILY_GOAL", payload: goal });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to save daily goal",
      });
      throw error;
    }
  }

  async function refresh() {
    await loadInitialData();
  }

  const value: FitnessContextType = {
    ...state,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    addCheckIn,
    setDailyGoal,
    refresh,
  };

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
}

export function useFitness(): FitnessContextType {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error("useFitness must be used within a FitnessProvider");
  }
  return context;
}
