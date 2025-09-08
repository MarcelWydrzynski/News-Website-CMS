import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router";

// Define what our context provides
type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  addArticleToUser: (id: number) => Promise<void>;
  cleanError: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if a user is already logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    };
    checkUser();
  }, []);

  // Listen for login/logout changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, username: string) => {
    setError(null);
    setLoading(true);

    // Step 1: Pre-check if email exists
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: "wrongpassword123", 
    });

    if (signInError && signInError.message !== "Invalid login credentials") {
      // Some other error (e.g., network), stop here
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (signInError?.message === "Invalid login credentials") {
      // Means email exists, but password is wrong
      setError("This email is already registered. Try logging in instead.");
      setLoading(false);
      return;
    }

    // Step 2: Continue with real signup
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, articles: [] } },
    });

    if (error) {
      setError(error.message);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }

    setLoading(false);
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
  };

  // Add articles to user favorites
  const addArticleToUser = async (id: number) => {
    if (!user) return;

    const userArticles = await supabase.auth.getUser();

    console.log(userArticles, id);
  };

  // Clear error function
  const cleanError = () => setError(null);

  return <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, addArticleToUser, cleanError }}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
