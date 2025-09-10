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
  userFavoriteArticles: number[];
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userFavoriteArticles, setUserFavoriteArticles] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if a user is already logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setUserFavoriteArticles(data.user?.user_metadata.articles || []); // ✅ load from metadata
      setLoading(false);
    };
    checkUser();
  }, []);

  // Listen for login/logout changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setUserFavoriteArticles(session?.user?.user_metadata.articles || []); // ✅ keep in sync
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, username: string) => {
    setError(null);
    setLoading(true);

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
      alert("You have been logged in. You can now acces the CMS page.");
    }

    setLoading(false);
  };

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      return;
    }

    // check if current URL contains "cms"
    if (window.location.pathname.includes("cms")) {
      navigate("/"); // force redirect to homepage
    } else {
      navigate(0);
    }
  };

  // Add/remove articles from favorites
  const addArticleToUser = async (id: number) => {
    if (!user) return;

    let updatedArticles: number[];

    if (userFavoriteArticles.includes(id)) {
      updatedArticles = userFavoriteArticles.filter((articleId) => articleId !== id);
    } else {
      updatedArticles = [...userFavoriteArticles, id];
    }
    setUserFavoriteArticles(updatedArticles);

    const { error } = await supabase.auth.updateUser({
      data: { ...user.user_metadata, articles: updatedArticles },
    });

    if (error) {
      setError(error.message);
    }
  };

  const cleanError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signUp,
        signIn,
        signOut,
        addArticleToUser,
        cleanError,
        userFavoriteArticles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
